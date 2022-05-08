"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoteEscrow = void 0;
const tslib_1 = require("tslib");
const token_utils_1 = require("@saberhq/token-utils");
const web3_js_1 = require("@solana/web3.js");
const bn_js_1 = tslib_1.__importDefault(require("bn.js"));
const constants_1 = require("../../constants");
const pda_1 = require("../govern/pda");
class VoteEscrow {
  constructor(sdk, locker, governorKey, escrowKey, owner) {
    this.sdk = sdk;
    this.locker = locker;
    this.governorKey = governorKey;
    this.escrowKey = escrowKey;
    this.owner = owner;
    this._lockerData = null;
    this._escrowData = null;
  }
  get provider() {
    return this.sdk.provider;
  }
  get lockerProgram() {
    return this.sdk.programs.LockedVoter;
  }
  /**
   * Locker data.
   */
  lockerData() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      if (!this._lockerData) {
        this._lockerData = yield this.lockerProgram.account.locker.fetch(
          this.locker
        );
      }
      return this._lockerData;
    });
  }
  /**
   * Escrow data.
   */
  data() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      if (!this._escrowData) {
        this._escrowData = yield this.lockerProgram.account.escrow.fetch(
          this.escrowKey
        );
      }
      return this._escrowData;
    });
  }
  /**
   * Creates a function to calculate the voting power of this escrow.
   * @returns
   */
  makeCalculateVotingPower() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      const escrowData = yield this.data();
      const lockerData = yield this.lockerData();
      return (timestampSeconds) => {
        if (escrowData.escrowStartedAt.eq(new bn_js_1.default(0))) {
          return new bn_js_1.default(0);
        }
        if (
          timestampSeconds < escrowData.escrowStartedAt.toNumber() ||
          timestampSeconds >= escrowData.escrowEndsAt.toNumber()
        ) {
          return new bn_js_1.default(0);
        }
        const secondsUntilLockupExpiry = escrowData.escrowEndsAt
          .sub(new bn_js_1.default(timestampSeconds))
          .toNumber();
        const relevantSecondsUntilLockupExpiry = Math.min(
          secondsUntilLockupExpiry,
          lockerData.params.maxStakeDuration.toNumber()
        );
        const powerIfMaxLockup = escrowData.amount.mul(
          new bn_js_1.default(lockerData.params.maxStakeVoteMultiplier)
        );
        return powerIfMaxLockup
          .mul(new bn_js_1.default(relevantSecondsUntilLockupExpiry))
          .div(lockerData.params.maxStakeDuration);
      };
    });
  }
  /**
   * Calculates the voting power of this escrow.
   * @param time Optional time to calculate power for.
   * @returns
   */
  calculateVotingPower(time = new Date()) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      return (yield this.makeCalculateVotingPower())(Math.floor(time.getTime() / 1000));
    });
  }
  /**
   * Activates a proposal.
   * @returns
   */
  activateProposal(proposal) {
    return this.provider.newTX([
      this.lockerProgram.instruction.activateProposal({
        accounts: {
          locker: this.locker,
          governor: this.governorKey,
          proposal,
          escrow: this.escrowKey,
          escrowOwner: this.owner,
          governProgram: constants_1.TRIBECA_ADDRESSES.Govern,
        },
      }),
    ]);
  }
  /**
   * Casts a vote on a proposal.
   * @returns
   */
  castVote({ proposal, side }) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      const [voteKey, voteBump] = yield (0, pda_1.findVoteAddress)(
        proposal,
        this.owner
      );
      const vote = yield this.provider.getAccountInfo(voteKey);
      let createVoteIX = null;
      if (!vote) {
        createVoteIX = this.sdk.programs.Govern.instruction.newVote(
          voteBump,
          this.owner,
          {
            accounts: {
              proposal,
              vote: voteKey,
              payer: this.provider.wallet.publicKey,
              systemProgram: web3_js_1.SystemProgram.programId,
            },
          }
        );
      }
      return this.provider.newTX([
        createVoteIX,
        this.lockerProgram.instruction.castVote(side, {
          accounts: {
            locker: this.locker,
            escrow: this.escrowKey,
            voteDelegate: this.owner,
            proposal,
            vote: voteKey,
            governor: this.governorKey,
            governProgram: constants_1.TRIBECA_ADDRESSES.Govern,
          },
        }),
      ]);
    });
  }
  /**
   * Locks tokens into the escrow.
   * @param amount
   * @param durationSeconds The duration of the lock, in seconds
   * @param authority
   * @returns
   */
  lock(amount, durationSeconds) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      const escrowData = yield this.data();
      const sourceTokens = yield (0, token_utils_1.getATAAddress)({
        mint: amount.token.mintAccount,
        owner: escrowData.owner,
      });
      return this.provider.newTX([
        this.lockerProgram.instruction.lock(
          amount.toU64(),
          new bn_js_1.default(durationSeconds),
          {
            accounts: {
              locker: this.locker,
              escrow: this.escrowKey,
              escrowTokens: escrowData.tokens,
              escrowOwner: escrowData.owner,
              sourceTokens,
              tokenProgram: token_utils_1.TOKEN_PROGRAM_ID,
            },
          }
        ),
      ]);
    });
  }
  /**
   * Exits the escrow.
   * @returns
   */
  exit() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      const lockerData = yield this.lockerData();
      const escrowData = yield this.data();
      const destinationTokens = yield (0, token_utils_1.getOrCreateATA)({
        provider: this.provider,
        mint: lockerData.tokenMint,
        owner: escrowData.owner,
      });
      return this.provider.newTX([
        destinationTokens.instruction,
        this.lockerProgram.instruction.exit({
          accounts: {
            locker: this.locker,
            escrow: this.escrowKey,
            escrowOwner: escrowData.owner,
            escrowTokens: escrowData.tokens,
            destinationTokens: destinationTokens.address,
            payer: this.provider.wallet.publicKey,
            tokenProgram: token_utils_1.TOKEN_PROGRAM_ID,
          },
        }),
      ]);
    });
  }
}
exports.VoteEscrow = VoteEscrow;
//# sourceMappingURL=escrow.js.map
