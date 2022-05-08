import { __awaiter } from "tslib";
import { utils } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import { TRIBECA_ADDRESSES } from "../../constants";
/**
 * Finds the PDA of a Governor.
 */
export const findGovernorAddress = (base) =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield PublicKey.findProgramAddress(
      [utils.bytes.utf8.encode("TribecaGovernor"), base.toBuffer()],
      TRIBECA_ADDRESSES.Govern
    );
  });
/**
 * Finds the PDA of a Proposal.
 */
export const findProposalAddress = (governorKey, index) =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield PublicKey.findProgramAddress(
      [
        utils.bytes.utf8.encode("TribecaProposal"),
        governorKey.toBuffer(),
        index.toArrayLike(Buffer, "le", 8),
      ],
      TRIBECA_ADDRESSES.Govern
    );
  });
/**
 * Finds the PDA of a Vote.
 * @param proposalKey
 * @param voterKey
 * @returns
 */
export const findVoteAddress = (proposalKey, voterKey) =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield PublicKey.findProgramAddress(
      [
        utils.bytes.utf8.encode("TribecaVote"),
        proposalKey.toBuffer(),
        voterKey.toBuffer(),
      ],
      TRIBECA_ADDRESSES.Govern
    );
  });
/**
 * Finds the address of a ProposalMeta.
 * @param proposalKey
 * @returns
 */
export const findProposalMetaAddress = (proposalKey) =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield PublicKey.findProgramAddress(
      [utils.bytes.utf8.encode("TribecaProposalMeta"), proposalKey.toBuffer()],
      TRIBECA_ADDRESSES.Govern
    );
  });
//# sourceMappingURL=pda.js.map
