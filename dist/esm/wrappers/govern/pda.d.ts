import type { u64 } from "@saberhq/token-utils";
import { PublicKey } from "@solana/web3.js";
/**
 * Finds the PDA of a Governor.
 */
export declare const findGovernorAddress: (base: PublicKey) => Promise<[PublicKey, number]>;
/**
 * Finds the PDA of a Proposal.
 */
export declare const findProposalAddress: (governorKey: PublicKey, index: u64) => Promise<[PublicKey, number]>;
/**
 * Finds the PDA of a Vote.
 * @param proposalKey
 * @param voterKey
 * @returns
 */
export declare const findVoteAddress: (proposalKey: PublicKey, voterKey: PublicKey) => Promise<[PublicKey, number]>;
/**
 * Finds the address of a ProposalMeta.
 * @param proposalKey
 * @returns
 */
export declare const findProposalMetaAddress: (proposalKey: PublicKey) => Promise<[PublicKey, number]>;
//# sourceMappingURL=pda.d.ts.map