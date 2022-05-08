import { __awaiter } from "tslib";
import {
  createMemoInstruction,
  TransactionEnvelope,
} from "@saberhq/solana-contrib";
import { getOrCreateATA, TOKEN_PROGRAM_ID } from "@saberhq/token-utils";
import {
  PublicKey,
  SystemProgram,
  SYSVAR_INSTRUCTIONS_PUBKEY,
} from "@solana/web3.js";
import invariant from "tiny-invariant";
import { TRIBECA_ADDRESSES } from "../../constants";
import { GovernorWrapper } from "../govern/governor";
import { findWhitelistAddress } from ".";
import { findEscrowAddress } from "./pda";
/**
 * Helper methods around a Locked Voter electorate.
 */
export class LockerWrapper {
  constructor(sdk, locker, governorKey) {
    this.sdk = sdk;
    this.locker = locker;
    this.governorKey = governorKey;
    this._lockerData = null;
    this.program = sdk.programs.LockedVoter;
    this.governor = new GovernorWrapper(sdk, governorKey);
  }
  static load(sdk, lockerKey, governorKey) {
    return __awaiter(this, void 0, void 0, function* () {
      const wrapper = new LockerWrapper(sdk, lockerKey, governorKey);
      yield wrapper.data();
      return wrapper;
    });
  }
  /**
   * Fetches the data of the locker.
   * @returns
   */
  reload() {
    return __awaiter(this, void 0, void 0, function* () {
      return this.program.account.locker.fetch(this.locker);
    });
  }
  fetchProposalData(proposalKey) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield this.sdk.govern.program.account.proposal.fetch(proposalKey);
    });
  }
  fetchEscrow(escrowKey) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield this.program.account.escrow.fetch(escrowKey);
    });
  }
  fetchEscrowByAuthority(authority = this.sdk.provider.wallet.publicKey) {
    return __awaiter(this, void 0, void 0, function* () {
      const [escrowKey] = yield findEscrowAddress(this.locker, authority);
      return this.fetchEscrow(escrowKey);
    });
  }
  /**
   * Fetches the data of the locker.
   * @returns
   */
  data() {
    return __awaiter(this, void 0, void 0, function* () {
      if (!this._lockerData) {
        this._lockerData = yield this.reload();
      }
      return this._lockerData;
    });
  }
  getOrCreateEscrow(authority = this.sdk.provider.wallet.publicKey) {
    return __awaiter(this, void 0, void 0, function* () {
      const [escrow] = yield findEscrowAddress(this.locker, authority);
      const escrowData = yield this.program.account.escrow.fetchNullable(
        escrow
      );
      if (escrowData) {
        return { escrow: escrow, instruction: null };
      } else {
        return {
          escrow: escrow,
          instruction: yield this.newEscrowIX(authority),
        };
      }
    });
  }
  /**
   * Creates the instruction to build a new Escrow.
   * @param authority
   * @returns
   */
  newEscrowIX(authority = this.sdk.provider.wallet.publicKey) {
    return __awaiter(this, void 0, void 0, function* () {
      const [escrow, bump] = yield findEscrowAddress(this.locker, authority);
      return this.program.instruction.newEscrow(bump, {
        accounts: {
          locker: this.locker,
          escrow,
          escrowOwner: authority,
          payer: this.sdk.provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        },
      });
    });
  }
  activateProposal({
    proposal,
    authority = this.sdk.provider.wallet.publicKey,
  }) {
    return __awaiter(this, void 0, void 0, function* () {
      const [escrow] = yield findEscrowAddress(this.locker, authority);
      const ix = this.program.instruction.activateProposal({
        accounts: {
          locker: this.locker,
          governor: this.governorKey,
          proposal,
          escrow,
          escrowOwner: authority,
          governProgram: TRIBECA_ADDRESSES.Govern,
        },
      });
      return new TransactionEnvelope(this.sdk.provider, [ix]);
    });
  }
  lockTokensV1({
    amount,
    duration,
    authority = this.sdk.provider.wallet.publicKey,
  }) {
    return __awaiter(this, void 0, void 0, function* () {
      invariant(this.locker, "locker not set");
      const { escrow, instruction: initEscrowIx } =
        yield this.getOrCreateEscrow(authority);
      const { govTokenAccount, govTokenVault, instructions } =
        yield this._getOrCreateGovTokenATAsInternal(authority, escrow);
      if (initEscrowIx) {
        instructions.push(initEscrowIx);
      }
      const lockerData = yield this.reload();
      instructions.push(
        this.program.instruction.lock(amount, duration, {
          accounts: {
            locker: this.locker,
            escrow: escrow,
            escrowOwner: authority,
            escrowTokens: govTokenVault,
            sourceTokens: govTokenAccount,
            tokenProgram: TOKEN_PROGRAM_ID,
          },
          remainingAccounts: lockerData.params.whitelistEnabled
            ? [
                {
                  pubkey: SYSVAR_INSTRUCTIONS_PUBKEY,
                  isSigner: false,
                  isWritable: false,
                },
                {
                  pubkey: PublicKey.default,
                  isSigner: false,
                  isWritable: false,
                },
              ]
            : [],
        })
      );
      return new TransactionEnvelope(this.sdk.provider, instructions);
    });
  }
  lockTokens({
    amount,
    duration,
    authority = this.sdk.provider.wallet.publicKey,
  }) {
    return __awaiter(this, void 0, void 0, function* () {
      invariant(this.locker, "locker not set");
      const { escrow, instruction: initEscrowIx } =
        yield this.getOrCreateEscrow(authority);
      const { govTokenAccount, govTokenVault, instructions } =
        yield this._getOrCreateGovTokenATAsInternal(authority, escrow);
      if (initEscrowIx) {
        instructions.push(initEscrowIx);
      }
      const lockerData = yield this.reload();
      const lockAccounts = {
        locker: this.locker,
        escrow: escrow,
        escrowOwner: authority,
        escrowTokens: govTokenVault,
        sourceTokens: govTokenAccount,
        tokenProgram: TOKEN_PROGRAM_ID,
      };
      if (lockerData.params.whitelistEnabled) {
        instructions.push(
          this.program.instruction.lockWithWhitelist(amount, duration, {
            accounts: {
              lock: lockAccounts,
              instructionsSysvar: SYSVAR_INSTRUCTIONS_PUBKEY,
            },
          })
        );
      } else {
        instructions.push(
          this.program.instruction.lockPermissionless(amount, duration, {
            accounts: lockAccounts,
          })
        );
      }
      return new TransactionEnvelope(this.sdk.provider, instructions);
    });
  }
  exit({ authority = this.sdk.provider.wallet.publicKey }) {
    return __awaiter(this, void 0, void 0, function* () {
      invariant(this.locker, "locker not set");
      const [escrow] = yield findEscrowAddress(this.locker, authority);
      const escrowData = yield this.fetchEscrow(escrow);
      const { govTokenAccount, instructions } =
        yield this._getOrCreateGovTokenATAsInternal(authority, escrow);
      instructions.push(
        this.program.instruction.exit({
          accounts: {
            locker: this.locker,
            escrow,
            escrowOwner: authority,
            escrowTokens: escrowData.tokens,
            destinationTokens: govTokenAccount,
            payer: this.sdk.provider.wallet.publicKey,
            tokenProgram: TOKEN_PROGRAM_ID,
          },
        })
      );
      return new TransactionEnvelope(this.sdk.provider, instructions);
    });
  }
  castVotes({
    voteSide,
    proposal,
    authority = this.sdk.provider.wallet.publicKey,
    reason,
  }) {
    return __awaiter(this, void 0, void 0, function* () {
      const ixs = [];
      const { escrow, instruction: escrowIx } = yield this.getOrCreateEscrow(
        authority
      );
      if (escrowIx) {
        ixs.push(escrowIx);
      }
      const { voteKey, instruction: createVoteIX } =
        yield this.governor.getOrCreateVote({
          proposal,
          voter: authority,
        });
      if (createVoteIX) {
        ixs.push(createVoteIX);
      }
      ixs.push(
        this.program.instruction.castVote(voteSide, {
          accounts: {
            locker: this.locker,
            escrow: escrow,
            voteDelegate:
              authority !== null && authority !== void 0
                ? authority
                : this.sdk.provider.wallet.publicKey,
            proposal,
            vote: voteKey,
            governor: this.governorKey,
            governProgram: TRIBECA_ADDRESSES.Govern,
          },
        })
      );
      if (reason === null || reason === void 0 ? void 0 : reason.length) {
        ixs.push(createMemoInstruction(reason, [authority]));
      }
      return new TransactionEnvelope(this.sdk.provider, ixs);
    });
  }
  setVoteDelegate(newDelegate, authority = this.sdk.provider.wallet.publicKey) {
    return __awaiter(this, void 0, void 0, function* () {
      const [escrow] = yield findEscrowAddress(this.locker, authority);
      return new TransactionEnvelope(this.sdk.provider, [
        this.program.instruction.setVoteDelegate(newDelegate, {
          accounts: {
            escrow,
            escrowOwner: authority,
          },
        }),
      ]);
    });
  }
  createApproveProgramLockPrivilegeIx(programId, owner) {
    return __awaiter(this, void 0, void 0, function* () {
      const [whitelistEntry, bump] = yield findWhitelistAddress(
        this.locker,
        programId,
        owner
      );
      const lockerData = yield this.reload();
      const governorData =
        yield this.sdk.programs.Govern.account.governor.fetch(
          lockerData.governor
        );
      return this.program.instruction.approveProgramLockPrivilege(bump, {
        accounts: {
          locker: this.locker,
          whitelistEntry,
          governor: lockerData.governor,
          smartWallet: governorData.smartWallet,
          executableId: programId,
          whitelistedOwner:
            owner !== null && owner !== void 0
              ? owner
              : SystemProgram.programId,
          payer: this.sdk.provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        },
      });
    });
  }
  createRevokeProgramLockPrivilegeIx(programId, owner) {
    return __awaiter(this, void 0, void 0, function* () {
      const [whitelistEntry] = yield findWhitelistAddress(
        this.locker,
        programId,
        owner
      );
      const lockerData = yield this.reload();
      const governorData =
        yield this.sdk.programs.Govern.account.governor.fetch(
          lockerData.governor
        );
      return this.program.instruction.revokeProgramLockPrivilege({
        accounts: {
          locker: this.locker,
          whitelistEntry,
          governor: lockerData.governor,
          smartWallet: governorData.smartWallet,
          payer: this.sdk.provider.wallet.publicKey,
        },
      });
    });
  }
  setLockerParamsIx(args) {
    return __awaiter(this, void 0, void 0, function* () {
      const lockerData = yield this.reload();
      const governorData =
        yield this.sdk.programs.Govern.account.governor.fetch(
          lockerData.governor
        );
      return this.program.instruction.setLockerParams(args, {
        accounts: {
          locker: this.locker,
          governor: lockerData.governor,
          smartWallet: governorData.smartWallet,
        },
      });
    });
  }
  _getOrCreateGovTokenATAsInternal(authority, escrow) {
    return __awaiter(this, void 0, void 0, function* () {
      const { provider } = this.sdk;
      const lockerData = yield this.data();
      const { address: govTokenAccount, instruction: ix1 } =
        yield getOrCreateATA({
          provider,
          mint: lockerData.tokenMint,
          owner: authority,
          payer: authority,
        });
      const { address: govTokenVault, instruction: ix2 } = yield getOrCreateATA(
        {
          provider,
          mint: lockerData.tokenMint,
          owner: escrow,
          payer: authority,
        }
      );
      return {
        govTokenAccount,
        govTokenVault,
        instructions: [ix1, ix2].filter((ix) => !!ix),
      };
    });
  }
}
//# sourceMappingURL=locker.js.map
