"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleVoterWrapper = void 0;
const tslib_1 = require("tslib");
const solana_contrib_1 = require("@saberhq/solana-contrib");
const token_utils_1 = require("@saberhq/token-utils");
const web3_js_1 = require("@solana/web3.js");
const tiny_invariant_1 = tslib_1.__importDefault(require("tiny-invariant"));
const constants_1 = require("../../constants");
const governor_1 = require("../govern/governor");
const pda_1 = require("./pda");
/**
 * Helper methods around a Simple Voter electorate.
 */
class SimpleVoterWrapper {
  constructor(sdk, electorate, governorKey) {
    this.sdk = sdk;
    this.electorate = electorate;
    this.governorKey = governorKey;
    this.program = sdk.programs.SimpleVoter;
    this.governor = new governor_1.GovernorWrapper(sdk, governorKey);
  }
  get provider() {
    return this.sdk.provider;
  }
  static load(sdk, electorateKey) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      const electorateData =
        yield sdk.programs.SimpleVoter.account.electorate.fetch(electorateKey);
      const wrapper = new SimpleVoterWrapper(
        sdk,
        electorateKey,
        electorateData.governor
      );
      wrapper.electorateData = electorateData;
      return wrapper;
    });
  }
  fetchProposalData(proposalKey) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      return yield this.sdk.programs.Govern.account.proposal.fetch(proposalKey);
    });
  }
  fetchTokenRecord(tokenRecordKey) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      return yield this.program.account.tokenRecord.fetch(tokenRecordKey);
    });
  }
  fetchVoterMetadata() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      (0, tiny_invariant_1.default)(this.electorate, "electorate not set");
      this.electorateData = yield this.program.account.electorate.fetch(
        this.electorate
      );
      return this.electorateData;
    });
  }
  getOrCreateTokenRecord(authority = this.sdk.provider.wallet.publicKey) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      (0, tiny_invariant_1.default)(this.electorate, "electorate not set");
      const [tokenRecord] = yield (0, pda_1.findTokenRecordAddress)(
        authority,
        this.electorate
      );
      try {
        yield this.program.account.tokenRecord.fetch(tokenRecord);
        return { tokenRecord, instruction: null };
      } catch (_a) {
        return {
          tokenRecord,
          instruction: yield this.initializeTokenRecordIx(authority),
        };
      }
    });
  }
  depositTokens(amount, authority = this.sdk.provider.wallet.publicKey) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      (0, tiny_invariant_1.default)(this.electorate, "electorate not set");
      const { tokenRecord, instruction: initTokenRecordIx } =
        yield this.getOrCreateTokenRecord(authority);
      const { govTokenAccount, govTokenVault, instructions } =
        yield this._getOrCreateGovTokenATAsInternal(authority, tokenRecord);
      if (initTokenRecordIx) {
        instructions.push(initTokenRecordIx);
      }
      instructions.push(
        this.program.instruction.depositTokens(amount, {
          accounts: {
            authority,
            govTokenAccount,
            govTokenVault,
            tokenRecord,
            tokenProgram: token_utils_1.TOKEN_PROGRAM_ID,
          },
        })
      );
      return new solana_contrib_1.TransactionEnvelope(
        this.sdk.provider,
        instructions
      );
    });
  }
  withdrawTokens(amount, authority) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      (0, tiny_invariant_1.default)(this.electorate, "electorate not set");
      (0,
      tiny_invariant_1.default)(this.electorateData, "electorate data not loaded");
      const [tokenRecord] = yield (0, pda_1.findTokenRecordAddress)(
        authority,
        this.electorate
      );
      const { govTokenAccount, govTokenVault, instructions } =
        yield this._getOrCreateGovTokenATAsInternal(authority, tokenRecord);
      instructions.push(
        this.program.instruction.withdrawTokens(amount, {
          accounts: {
            authority,
            govTokenAccount,
            govTokenVault,
            tokenRecord,
            tokenProgram: token_utils_1.TOKEN_PROGRAM_ID,
          },
        })
      );
      return new solana_contrib_1.TransactionEnvelope(
        this.sdk.provider,
        instructions
      );
    });
  }
  activateProposal(proposal) {
    const ix = this.program.instruction.activateProposal({
      accounts: {
        electorate: this.electorate,
        governor: this.governorKey,
        proposal,
        governProgram: constants_1.TRIBECA_ADDRESSES.Govern,
      },
    });
    return new solana_contrib_1.TransactionEnvelope(this.sdk.provider, [ix]);
  }
  castVotes(args) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      (0,
      tiny_invariant_1.default)(this.electorateData, "electorate data not loaded");
      const {
        authority = this.provider.wallet.publicKey,
        proposal,
        voteSide,
        reason,
      } = args;
      const ixs = [];
      const { tokenRecord, instruction: tokenRecordIx } =
        yield this.getOrCreateTokenRecord(authority);
      if (tokenRecordIx) {
        ixs.push(tokenRecordIx);
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
        this.program.instruction.castVotes(voteSide, {
          accounts: {
            electorate: this.electorate,
            authority:
              authority !== null && authority !== void 0
                ? authority
                : this.sdk.provider.wallet.publicKey,
            proposal,
            tokenRecord,
            vote: voteKey,
            tribeca: this._genTribecaContext(),
          },
        })
      );
      if (reason) {
        ixs.push(
          (0, solana_contrib_1.createMemoInstruction)(reason, [authority])
        );
      }
      return new solana_contrib_1.TransactionEnvelope(this.sdk.provider, ixs);
    });
  }
  withdrawVotes(proposal, authority = this.sdk.provider.wallet.publicKey) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      (0,
      tiny_invariant_1.default)(this.electorateData, "electorate data not loaded");
      const ixs = [];
      const { tokenRecord, instruction: tokenRecordIx } =
        yield this.getOrCreateTokenRecord(authority);
      if (tokenRecordIx) {
        ixs.push(tokenRecordIx);
      }
      const { voteKey, instruction: voteRecieptIx } =
        yield this.governor.getOrCreateVote({
          proposal,
        });
      if (voteRecieptIx) {
        ixs.push(voteRecieptIx);
      }
      ixs.push(
        this.program.instruction.withdrawVotes({
          accounts: {
            electorate: this.electorate,
            authority,
            proposal,
            tokenRecord,
            vote: voteKey,
            tribeca: this._genTribecaContext(),
          },
        })
      );
      return new solana_contrib_1.TransactionEnvelope(this.sdk.provider, ixs);
    });
  }
  depositTokenAndCastVote(args) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      const {
        amount,
        proposal,
        voteSide,
        reason,
        authority = this.provider.wallet.publicKey,
      } = args;
      const { tokenRecord, instruction: tokenRecordIx } =
        yield this.getOrCreateTokenRecord(authority);
      const { govTokenAccount, govTokenVault, instructions } =
        yield this._getOrCreateGovTokenATAsInternal(authority, tokenRecord);
      if (tokenRecordIx) {
        instructions.push(tokenRecordIx);
      }
      const { voteKey, instruction: createVoteIX } =
        yield this.governor.getOrCreateVote({
          proposal,
          voter: authority,
        });
      if (createVoteIX) {
        instructions.push(createVoteIX);
      }
      instructions.push(
        this.program.instruction.depositTokens(amount, {
          accounts: {
            authority,
            govTokenAccount,
            govTokenVault,
            tokenRecord,
            tokenProgram: token_utils_1.TOKEN_PROGRAM_ID,
          },
        })
      );
      return new solana_contrib_1.TransactionEnvelope(
        this.sdk.provider,
        instructions.concat(
          this._genCastVotesInstructions({
            proposal,
            authority,
            voteSide,
            reason,
            vote: voteKey,
            tokenRecord,
          })
        )
      );
    });
  }
  initializeTokenRecordIx(authority = this.sdk.provider.wallet.publicKey) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      (0, tiny_invariant_1.default)(this.electorate, "electorate not set");
      (0,
      tiny_invariant_1.default)(this.electorateData, "electorate data not loaded");
      const [tokenRecord, bump] = yield (0, pda_1.findTokenRecordAddress)(
        authority,
        this.electorate
      );
      return this.program.instruction.initializeTokenRecord(bump, {
        accounts: {
          authority,
          tokenRecord,
          electorate: this.electorate,
          govTokenVault: yield (0, token_utils_1.getATAAddress)({
            mint: this.electorateData.govTokenMint,
            owner: tokenRecord,
          }),
          payer: this.sdk.provider.wallet.publicKey,
          systemProgram: web3_js_1.SystemProgram.programId,
        },
      });
    });
  }
  _genCastVotesInstructions(args) {
    var _a;
    const { proposal, voteSide, reason, tokenRecord, vote } = args;
    const authority =
      (_a = args.authority) !== null && _a !== void 0
        ? _a
        : this.provider.wallet.publicKey;
    const ixs = [];
    ixs.push(
      this.program.instruction.castVotes(voteSide, {
        accounts: {
          electorate: this.electorate,
          authority,
          proposal,
          tokenRecord,
          vote,
          tribeca: this._genTribecaContext(),
        },
      })
    );
    if (reason) {
      ixs.push(
        (0, solana_contrib_1.createMemoInstruction)(reason, [authority])
      );
    }
    return ixs;
  }
  _genTribecaContext() {
    (0, tiny_invariant_1.default)(
      this.electorateData,
      "electrate data not loaded"
    );
    return {
      governor: this.electorateData.governor,
      program: constants_1.TRIBECA_ADDRESSES.Govern,
    };
  }
  _getOrCreateGovTokenATAsInternal(authority, tokenRecord) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      (0,
      tiny_invariant_1.default)(this.electorateData, "electorate data not loaded");
      const { provider } = this.sdk;
      const { address: govTokenAccount, instruction: ix1 } = yield (0,
      token_utils_1.getOrCreateATA)({
        provider,
        mint: this.electorateData.govTokenMint,
        owner: authority,
        payer: authority,
      });
      const { address: govTokenVault, instruction: ix2 } = yield (0,
      token_utils_1.getOrCreateATA)({
        provider,
        mint: this.electorateData.govTokenMint,
        owner: tokenRecord,
        payer: authority,
      });
      return {
        govTokenAccount,
        govTokenVault,
        instructions: [ix1, ix2].filter((ix) => !!ix),
      };
    });
  }
}
exports.SimpleVoterWrapper = SimpleVoterWrapper;
//# sourceMappingURL=electorate.js.map
