"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_LOCKER_PARAMS =
  exports.DEFAULT_GOVERNANCE_PARAMETERS =
  exports.DEFAULT_VOTE_PERIOD =
  exports.DEFAULT_VOTE_DELAY =
  exports.DEFAULT_PROPOSAL_THRESHOLD =
  exports.DEFAULT_QUORUM_VOTES =
  exports.ONE_YEAR =
  exports.ONE_DAY =
  exports.DEFAULT_DECIMALS =
  exports.TRIBECA_CODERS =
  exports.TRIBECA_IDLS =
  exports.TRIBECA_ADDRESSES =
    void 0;
const anchor_contrib_1 = require("@saberhq/anchor-contrib");
const web3_js_1 = require("@solana/web3.js");
const bn_js_1 = require("bn.js");
const govern_1 = require("./idls/govern");
const locked_voter_1 = require("./idls/locked_voter");
const simple_voter_1 = require("./idls/simple_voter");
// See `Anchor.toml` for all addresses.
exports.TRIBECA_ADDRESSES = {
  SimpleVoter: new web3_js_1.PublicKey(
    "Tok6iuA69RLN1QrpXgQKnDgE1YYbLzQsZGSoz75fQdz"
  ),
  Govern: new web3_js_1.PublicKey(
    "Govz1VyoyLD5BL6CSCxUJLVLsQHRwjfFj1prNsdNg5Jw"
  ),
  LockedVoter: new web3_js_1.PublicKey(
    "LocktDzaV1W2Bm9DeZeiyz4J9zs4fRqNiYqQyracRXw"
  ),
};
/**
 * Program IDLs.
 */
exports.TRIBECA_IDLS = {
  SimpleVoter: simple_voter_1.SimpleVoterJSON,
  Govern: govern_1.GovernJSON,
  LockedVoter: locked_voter_1.LockedVoterJSON,
};
/**
 * Coders.
 */
exports.TRIBECA_CODERS = (0, anchor_contrib_1.buildCoderMap)(
  exports.TRIBECA_IDLS,
  exports.TRIBECA_ADDRESSES
);
exports.DEFAULT_DECIMALS = 6;
exports.ONE_DAY = new bn_js_1.BN(24 * 60 * 60);
/**
 * Number of seconds in one year.
 */
exports.ONE_YEAR = new bn_js_1.BN(365).mul(exports.ONE_DAY);
// Default number of votes in support of a proposal required in order for a quorum to be reached and for a vote to succeed
// ~ 4% of 10 billion
exports.DEFAULT_QUORUM_VOTES = new bn_js_1.BN(10000000000 * 0.04).mul(
  new bn_js_1.BN(10).pow(new bn_js_1.BN(exports.DEFAULT_DECIMALS))
);
// Default number of votes required in order for a voter to become a proposer
// ~ 1% of 10 billion
exports.DEFAULT_PROPOSAL_THRESHOLD = new bn_js_1.BN(10000000000 * 0.01).mul(
  new bn_js_1.BN(10).pow(new bn_js_1.BN(exports.DEFAULT_DECIMALS))
);
// Default delay before voting on a proposal may take place, once proposed, ~ 1 second
exports.DEFAULT_VOTE_DELAY = new bn_js_1.BN(1);
// Default duration of voting on a proposal, in seconds, ~ 3 days
exports.DEFAULT_VOTE_PERIOD = new bn_js_1.BN(3).mul(exports.ONE_DAY);
/**
 * Default parameters for a Governor.
 */
exports.DEFAULT_GOVERNANCE_PARAMETERS = {
  timelockDelaySeconds: new bn_js_1.BN(0),
  quorumVotes: exports.DEFAULT_QUORUM_VOTES,
  votingDelay: exports.DEFAULT_VOTE_DELAY,
  votingPeriod: exports.DEFAULT_VOTE_PERIOD,
};
/**
 * Default parameters for a Locker.
 */
exports.DEFAULT_LOCKER_PARAMS = {
  // 1M tokens if max locked.
  proposalActivationMinVotes: new bn_js_1.BN(10000000 * Math.pow(10, 6)),
  // 1 day.
  minStakeDuration: exports.ONE_DAY,
  // 5 years.
  maxStakeDuration: new bn_js_1.BN(5).mul(exports.ONE_YEAR),
  maxStakeVoteMultiplier: 10,
  whitelistEnabled: false,
};
//# sourceMappingURL=constants.js.map
