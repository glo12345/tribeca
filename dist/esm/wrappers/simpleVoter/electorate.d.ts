import { TransactionEnvelope } from "@saberhq/solana-contrib";
import type { u64 } from "@saberhq/token-utils";
import type { PublicKey, TransactionInstruction } from "@solana/web3.js";
import type { ElectorateData, ProposalData, SimpleVoterProgram, TokenRecordData } from "../../programs";
import type { TribecaSDK } from "../../sdk";
import { GovernorWrapper } from "../govern/governor";
import type { VoteArgs } from "./types";
/**
 * Helper methods around a Simple Voter electorate.
 */
export declare class SimpleVoterWrapper {
    readonly sdk: TribecaSDK;
    readonly electorate: PublicKey;
    readonly governorKey: PublicKey;
    readonly program: SimpleVoterProgram;
    readonly governor: GovernorWrapper;
    electorateData?: ElectorateData;
    constructor(sdk: TribecaSDK, electorate: PublicKey, governorKey: PublicKey);
    get provider(): import("@saberhq/solana-contrib").AugmentedProvider;
    static load(sdk: TribecaSDK, electorateKey: PublicKey): Promise<SimpleVoterWrapper>;
    fetchProposalData(proposalKey: PublicKey): Promise<ProposalData>;
    fetchTokenRecord(tokenRecordKey: PublicKey): Promise<TokenRecordData>;
    fetchVoterMetadata(): Promise<ElectorateData>;
    getOrCreateTokenRecord(authority?: PublicKey): Promise<{
        tokenRecord: PublicKey;
        instruction: TransactionInstruction | null;
    }>;
    depositTokens(amount: u64, authority?: PublicKey): Promise<TransactionEnvelope>;
    withdrawTokens(amount: u64, authority: PublicKey): Promise<TransactionEnvelope>;
    activateProposal(proposal: PublicKey): TransactionEnvelope;
    castVotes(args: VoteArgs): Promise<TransactionEnvelope>;
    withdrawVotes(proposal: PublicKey, authority?: PublicKey): Promise<TransactionEnvelope>;
    depositTokenAndCastVote(args: VoteArgs & {
        amount: u64;
    }): Promise<TransactionEnvelope>;
    initializeTokenRecordIx(authority?: PublicKey): Promise<TransactionInstruction>;
    private _genCastVotesInstructions;
    private _genTribecaContext;
    private _getOrCreateGovTokenATAsInternal;
}
//# sourceMappingURL=electorate.d.ts.map