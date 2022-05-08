/// <reference types="bn.js" />
import type { BN } from "@project-serum/anchor";
import { TransactionEnvelope } from "@saberhq/solana-contrib";
import type { TransactionInstruction } from "@solana/web3.js";
import { PublicKey } from "@solana/web3.js";
import type { EscrowData, LockedVoterProgram, LockerData, LockerParams, ProposalData } from "../../programs";
import type { TribecaSDK } from "../../sdk";
import type { VoteSide } from "../../wrappers/govern/types";
import { GovernorWrapper } from "../govern/governor";
/**
 * Helper methods around a Locked Voter electorate.
 */
export declare class LockerWrapper {
    readonly sdk: TribecaSDK;
    readonly locker: PublicKey;
    readonly governorKey: PublicKey;
    readonly program: LockedVoterProgram;
    readonly governor: GovernorWrapper;
    private _lockerData;
    constructor(sdk: TribecaSDK, locker: PublicKey, governorKey: PublicKey);
    static load(sdk: TribecaSDK, lockerKey: PublicKey, governorKey: PublicKey): Promise<LockerWrapper>;
    /**
     * Fetches the data of the locker.
     * @returns
     */
    reload(): Promise<LockerData>;
    fetchProposalData(proposalKey: PublicKey): Promise<ProposalData>;
    fetchEscrow(escrowKey: PublicKey): Promise<EscrowData>;
    fetchEscrowByAuthority(authority?: PublicKey): Promise<EscrowData>;
    /**
     * Fetches the data of the locker.
     * @returns
     */
    data(): Promise<LockerData>;
    getOrCreateEscrow(authority?: PublicKey): Promise<{
        escrow: PublicKey;
        instruction: TransactionInstruction | null;
    }>;
    /**
     * Creates the instruction to build a new Escrow.
     * @param authority
     * @returns
     */
    newEscrowIX(authority?: PublicKey): Promise<TransactionInstruction>;
    activateProposal({ proposal, authority, }: {
        proposal: PublicKey;
        authority?: PublicKey;
    }): Promise<TransactionEnvelope>;
    lockTokensV1({ amount, duration, authority, }: {
        amount: BN;
        duration: BN;
        authority?: PublicKey;
    }): Promise<TransactionEnvelope>;
    lockTokens({ amount, duration, authority, }: {
        amount: BN;
        duration: BN;
        authority?: PublicKey;
    }): Promise<TransactionEnvelope>;
    exit({ authority, }: {
        authority?: PublicKey;
    }): Promise<TransactionEnvelope>;
    castVotes({ voteSide, proposal, authority, reason, }: {
        voteSide: VoteSide;
        proposal: PublicKey;
        authority?: PublicKey;
        reason?: string;
    }): Promise<TransactionEnvelope>;
    setVoteDelegate(newDelegate: PublicKey, authority?: PublicKey): Promise<TransactionEnvelope>;
    createApproveProgramLockPrivilegeIx(programId: PublicKey, owner: PublicKey | null): Promise<TransactionInstruction>;
    createRevokeProgramLockPrivilegeIx(programId: PublicKey, owner: PublicKey | null): Promise<TransactionInstruction>;
    setLockerParamsIx(args: LockerParams): Promise<TransactionInstruction>;
    private _getOrCreateGovTokenATAsInternal;
}
//# sourceMappingURL=locker.d.ts.map