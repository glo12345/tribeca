"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProposalState = void 0;
const tslib_1 = require("tslib");
const bn_js_1 = tslib_1.__importDefault(require("bn.js"));
const types_1 = require("./types");
/**
 * Gets the state of a proposal.
 * @returns
 */
const getProposalState = ({
  proposalData,
  currentTimeSeconds = Math.floor(new Date().getTime() / 1000),
}) => {
  if (proposalData.canceledAt.gt(new bn_js_1.default(0))) {
    return types_1.ProposalState.Canceled;
  } else if (proposalData.activatedAt.eq(new bn_js_1.default(0))) {
    return types_1.ProposalState.Draft;
  } else if (
    proposalData.votingEndsAt.gte(new bn_js_1.default(currentTimeSeconds))
  ) {
    return types_1.ProposalState.Active;
  } else if (
    proposalData.forVotes.lte(proposalData.againstVotes) ||
    proposalData.forVotes
      .add(proposalData.abstainVotes)
      .add(proposalData.againstVotes)
      .lt(proposalData.quorumVotes)
  ) {
    return types_1.ProposalState.Defeated;
  } else if (proposalData.queuedAt.gt(new bn_js_1.default(0))) {
    return types_1.ProposalState.Queued;
  }
  return types_1.ProposalState.Succeeded;
};
exports.getProposalState = getProposalState;
//# sourceMappingURL=proposal.js.map
