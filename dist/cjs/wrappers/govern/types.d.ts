import type { TransactionEnvelope } from "@saberhq/solana-contrib";
import type { PublicKey } from "@solana/web3.js";
import type { GovernorWrapper } from "./governor";
export declare type PendingGovernor = {
    wrapper: GovernorWrapper;
    tx: TransactionEnvelope;
};
export declare type WhitelistArgs = {
    canPropose: boolean;
    activator: PublicKey;
    smartWalletOwner?: PublicKey;
};
/**
 * State of a proposal.
 */
export declare enum ProposalState {
    Draft = 0,
    Active = 1,
    Canceled = 2,
    Defeated = 3,
    Succeeded = 4,
    Queued = 5
}
/**
 * Labels for proposal states.
 */
export declare const PROPOSAL_STATE_LABELS: {
    [K in ProposalState]: string;
};
/**
 * Side of a vote.
 */
export declare enum VoteSide {
    /**
     * A vote that has not been set or has been unset.
     */
    Pending = 0,
    /**
     * Vote against the passing of the proposal.
     */
    Against = 1,
    /**
     * Vote to make the proposal pass.
     */
    For = 2,
    /**
     * This vote does not count as a `For` or `Against`, but it still contributes to quorum.
     */
    Abstain = 3
}
/**
 * Labels for vote sides.
 */
export declare const VOTE_SIDE_LABELS: {
    [K in VoteSide]: string;
};
//# sourceMappingURL=types.d.ts.map