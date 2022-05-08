/**
 * State of a proposal.
 */
export var ProposalState;
(function (ProposalState) {
  /*
   * Anyone can create a proposal on Tribeca. When a governance proposal is created,
   * it is considered a [ProposalState::Draft] and enters a review period, after which voting weights
   * are recorded and voting begins.
   */
  ProposalState[(ProposalState["Draft"] = 0)] = "Draft";
  /*
   * Each DAO has requirements for who can activate proposals; a common way
   * is to require the user to have a minimum amount of tokens.
   * An [ProposalState::Active] proposal is one that is surfaced to the community to put up for voting.
   */
  ProposalState[(ProposalState["Active"] = 1)] = "Active";
  /*
   * If a proposal is still a [ProposalState::Draft], a proposal may be canceled by its creator.
   * A canceled proposal cannot be reactivated; it simply just exists as a record.
   */
  ProposalState[(ProposalState["Canceled"] = 2)] = "Canceled";
  /*
   * After the voting period ends, votes are tallied up. A proposal is [ProposalState::Defeated] if one of
   * two scenarios happen:
   * - More or equal votes are [VoteSide::Against] than [VoteSide::For].
   * - The sum of all votes does not meet quorum.
   */
  ProposalState[(ProposalState["Defeated"] = 3)] = "Defeated";
  /*
   * A proposal is [ProposalState::Succeeded] if it is not defeated and voting is over.
   */
  ProposalState[(ProposalState["Succeeded"] = 4)] = "Succeeded";
  /*
   * A succeeded proposal may be [ProposalState::Queued] into the [SmartWallet].
   */
  ProposalState[(ProposalState["Queued"] = 5)] = "Queued";
})(ProposalState || (ProposalState = {}));
/**
 * Labels for proposal states.
 */
export const PROPOSAL_STATE_LABELS = {
  [ProposalState.Active]: "Active",
  [ProposalState.Draft]: "Draft",
  [ProposalState.Canceled]: "Canceled",
  [ProposalState.Defeated]: "Defeated",
  [ProposalState.Succeeded]: "Succeeded",
  [ProposalState.Queued]: "Queued",
};
/**
 * Side of a vote.
 */
export var VoteSide;
(function (VoteSide) {
  /**
   * A vote that has not been set or has been unset.
   */
  VoteSide[(VoteSide["Pending"] = 0)] = "Pending";
  /**
   * Vote against the passing of the proposal.
   */
  VoteSide[(VoteSide["Against"] = 1)] = "Against";
  /**
   * Vote to make the proposal pass.
   */
  VoteSide[(VoteSide["For"] = 2)] = "For";
  /**
   * This vote does not count as a `For` or `Against`, but it still contributes to quorum.
   */
  VoteSide[(VoteSide["Abstain"] = 3)] = "Abstain";
})(VoteSide || (VoteSide = {}));
/**
 * Labels for vote sides.
 */
export const VOTE_SIDE_LABELS = {
  [VoteSide.For]: "For",
  [VoteSide.Against]: "Against",
  [VoteSide.Abstain]: "Abstain",
  [VoteSide.Pending]: "Pending",
};
//# sourceMappingURL=types.js.map
