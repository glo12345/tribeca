import type { ProposalData } from "../../programs/govern";
import { ProposalState } from "./types";
/**
 * Gets the state of a proposal.
 * @returns
 */
export declare const getProposalState: ({ proposalData, currentTimeSeconds, }: {
    proposalData: ProposalData;
    currentTimeSeconds?: number;
}) => ProposalState;
//# sourceMappingURL=proposal.d.ts.map