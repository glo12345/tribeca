"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GovernorWrapper = void 0;
const tslib_1 = require("tslib");
const client_1 = require("@gokiprotocol/client");
const solana_contrib_1 = require("@saberhq/solana-contrib");
const token_utils_1 = require("@saberhq/token-utils");
const web3_js_1 = require("@solana/web3.js");
const pda_1 = require("./pda");
/**
 * Wrapper around a Governor.
 */
class GovernorWrapper {
  constructor(sdk, governorKey) {
    this.sdk = sdk;
    this.governorKey = governorKey;
    this._governor = null;
  }
  get provider() {
    return this.sdk.provider;
  }
  get program() {
    return this.sdk.programs.Govern;
  }
  reload() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      return yield this.program.account.governor.fetch(this.governorKey);
    });
  }
  data() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      if (!this._governor) {
        this._governor = yield this.reload();
      }
      return this._governor;
    });
  }
  findProposalAddress(index) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      const [key] = yield (0, pda_1.findProposalAddress)(
        this.governorKey,
        index
      );
      return key;
    });
  }
  fetchProposalByKey(key) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      return yield this.program.account.proposal.fetch(key);
    });
  }
  fetchProposal(index) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      const key = yield this.findProposalAddress(index);
      return yield this.fetchProposalByKey(key);
    });
  }
  fetchProposalMeta(proposalKey) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      const [key] = yield (0, pda_1.findProposalMetaAddress)(proposalKey);
      return yield this.program.account.proposalMeta.fetch(key);
    });
  }
  /**
   * Creates a ProposalMeta for a proposal.
   * Only the Proposer may call this.
   *
   * @returns
   */
  createProposalMeta({
    proposal,
    proposer = this.sdk.provider.wallet.publicKey,
    title,
    descriptionLink,
  }) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      const [proposalMetaKey, bump] = yield (0, pda_1.findProposalMetaAddress)(
        proposal
      );
      const ix = this.sdk.programs.Govern.instruction.createProposalMeta(
        bump,
        title,
        descriptionLink,
        {
          accounts: {
            proposal,
            proposer,
            proposalMeta: proposalMetaKey,
            payer: this.provider.wallet.publicKey,
            systemProgram: web3_js_1.SystemProgram.programId,
          },
        }
      );
      return this.provider.newTX([ix]);
    });
  }
  /**
   * Creates a new Proposal.
   * @returns
   */
  createProposal({
    proposer = this.sdk.provider.wallet.publicKey,
    instructions,
  }) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      const { provider } = this.sdk;
      const governorData = yield this.reload();
      const index = new token_utils_1.u64(governorData.proposalCount);
      const [proposal, bump] = yield (0, pda_1.findProposalAddress)(
        this.governorKey,
        index
      );
      const ixs = [];
      ixs.push(
        this.sdk.programs.Govern.instruction.createProposal(
          bump,
          instructions,
          {
            accounts: {
              governor: this.governorKey,
              proposal,
              proposer,
              payer: provider.wallet.publicKey,
              systemProgram: web3_js_1.SystemProgram.programId,
            },
          }
        )
      );
      return {
        proposal,
        index,
        tx: this.provider.newTX(ixs),
      };
    });
  }
  /**
   * Queues a Proposal for execution by the Smart Wallet.
   * @returns
   */
  queueProposal({
    index,
    smartWalletProgram = client_1.GOKI_ADDRESSES.SmartWallet,
    payer = this.provider.wallet.publicKey,
  }) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      const governorData = yield this.data();
      const [proposal] = yield (0, pda_1.findProposalAddress)(
        this.governorKey,
        index
      );
      const smartWalletDataRaw =
        yield this.program.provider.connection.getAccountInfo(
          governorData.smartWallet
        );
      if (!smartWalletDataRaw) {
        throw new Error("smart wallet not found");
      }
      const smartWalletData =
        client_1.GOKI_CODERS.SmartWallet.accountParsers.smartWallet(
          smartWalletDataRaw.data
        );
      const [txKey, txBump] = yield (0, client_1.findTransactionAddress)(
        governorData.smartWallet,
        smartWalletData.numTransactions.toNumber()
      );
      return new solana_contrib_1.TransactionEnvelope(this.sdk.provider, [
        this.program.instruction.queueProposal(txBump, {
          accounts: {
            governor: this.governorKey,
            proposal,
            smartWallet: governorData.smartWallet,
            smartWalletProgram,
            transaction: txKey,
            payer,
            systemProgram: web3_js_1.SystemProgram.programId,
          },
        }),
      ]);
    });
  }
  /**
   * Cancel a new Proposal.
   * @returns
   */
  cancelProposal({ proposal, proposer = this.sdk.provider.wallet.publicKey }) {
    return new solana_contrib_1.TransactionEnvelope(this.sdk.provider, [
      this.sdk.programs.Govern.instruction.cancelProposal({
        accounts: {
          governor: this.governorKey,
          proposal,
          proposer,
        },
      }),
    ]);
  }
  getOrCreateVote({
    proposal,
    voter = this.sdk.provider.wallet.publicKey,
    payer = this.sdk.provider.wallet.publicKey,
  }) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      const [voteKey, bump] = yield (0, pda_1.findVoteAddress)(proposal, voter);
      try {
        yield this.program.account.vote.fetch(voteKey);
        return { voteKey, instruction: null };
      } catch (_a) {
        return {
          voteKey,
          instruction: yield this.createVoteIx({
            proposal,
            voteKeyAndBump: [voteKey, bump],
            voter,
            payer,
          }),
        };
      }
    });
  }
  createVoteIx({
    proposal,
    voteKeyAndBump,
    voter = this.sdk.provider.wallet.publicKey,
    payer = this.sdk.provider.wallet.publicKey,
  }) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      if (!voteKeyAndBump) {
        voteKeyAndBump = yield (0, pda_1.findVoteAddress)(proposal, voter);
      }
      const [voteKey, bump] = voteKeyAndBump;
      return this.program.instruction.newVote(bump, voter, {
        accounts: {
          vote: voteKey,
          proposal,
          payer,
          systemProgram: web3_js_1.SystemProgram.programId,
        },
      });
    });
  }
  setGovernanceParamsIx(newParams) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      const { smartWallet } = yield this.data();
      return this.program.instruction.setGovernanceParams(newParams, {
        accounts: {
          governor: this.governorKey,
          smartWallet,
        },
      });
    });
  }
}
exports.GovernorWrapper = GovernorWrapper;
//# sourceMappingURL=governor.js.map
