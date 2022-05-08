import type { AnchorTypes } from "@saberhq/anchor-contrib";
import type { AccountMeta } from "@solana/web3.js";
import type { GovernIDL } from "../idls/govern";
export * from "../idls/govern";
export declare type GovernTypes = AnchorTypes<GovernIDL, {
    governor: GovernorData;
    proposal: ProposalData;
    vote: VoteData;
    proposalMeta: ProposalMetaData;
}, {
    ProposalInstruction: ProposalInstruction;
    ProposalAccountMeta: AccountMeta;
    GovernanceParameters: GovernanceParameters;
}>;
declare type Accounts = GovernTypes["Accounts"];
export declare type GovernorData = Accounts["Governor"];
export declare type ProposalData = Accounts["Proposal"];
export declare type VoteData = Accounts["Vote"];
export declare type ProposalMetaData = Accounts["ProposalMeta"] & {
    title: string;
    descriptionLink: string;
};
export declare type GovernanceParameters = GovernTypes["Defined"]["GovernanceParameters"];
export declare type ProposalInstruction = GovernTypes["Defined"]["ProposalInstruction"] & {
    keys: AccountMeta[];
};
export declare type GovernProgram = GovernTypes["Program"];
//# sourceMappingURL=govern.d.ts.map