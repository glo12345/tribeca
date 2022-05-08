"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findProposalMetaAddress =
  exports.findVoteAddress =
  exports.findProposalAddress =
  exports.findGovernorAddress =
    void 0;
const tslib_1 = require("tslib");
const anchor_1 = require("@project-serum/anchor");
const web3_js_1 = require("@solana/web3.js");
const constants_1 = require("../../constants");
/**
 * Finds the PDA of a Governor.
 */
const findGovernorAddress = (base) =>
  tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield web3_js_1.PublicKey.findProgramAddress(
      [anchor_1.utils.bytes.utf8.encode("TribecaGovernor"), base.toBuffer()],
      constants_1.TRIBECA_ADDRESSES.Govern
    );
  });
exports.findGovernorAddress = findGovernorAddress;
/**
 * Finds the PDA of a Proposal.
 */
const findProposalAddress = (governorKey, index) =>
  tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield web3_js_1.PublicKey.findProgramAddress(
      [
        anchor_1.utils.bytes.utf8.encode("TribecaProposal"),
        governorKey.toBuffer(),
        index.toArrayLike(Buffer, "le", 8),
      ],
      constants_1.TRIBECA_ADDRESSES.Govern
    );
  });
exports.findProposalAddress = findProposalAddress;
/**
 * Finds the PDA of a Vote.
 * @param proposalKey
 * @param voterKey
 * @returns
 */
const findVoteAddress = (proposalKey, voterKey) =>
  tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield web3_js_1.PublicKey.findProgramAddress(
      [
        anchor_1.utils.bytes.utf8.encode("TribecaVote"),
        proposalKey.toBuffer(),
        voterKey.toBuffer(),
      ],
      constants_1.TRIBECA_ADDRESSES.Govern
    );
  });
exports.findVoteAddress = findVoteAddress;
/**
 * Finds the address of a ProposalMeta.
 * @param proposalKey
 * @returns
 */
const findProposalMetaAddress = (proposalKey) =>
  tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield web3_js_1.PublicKey.findProgramAddress(
      [
        anchor_1.utils.bytes.utf8.encode("TribecaProposalMeta"),
        proposalKey.toBuffer(),
      ],
      constants_1.TRIBECA_ADDRESSES.Govern
    );
  });
exports.findProposalMetaAddress = findProposalMetaAddress;
//# sourceMappingURL=pda.js.map
