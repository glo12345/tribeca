/// <reference types="bn.js" />
import type { BN } from "@project-serum/anchor";
import type { AugmentedProvider, Provider } from "@saberhq/solana-contrib";
import { TransactionEnvelope } from "@saberhq/solana-contrib";
import type { PublicKey, Signer } from "@solana/web3.js";
import { Keypair } from "@solana/web3.js";
import type { TribecaPrograms } from "./constants";
import type { LockerParams } from "./programs/lockedVoter";
import { GovernWrapper } from "./wrappers";
import type { PendingElectorate } from "./wrappers/simpleVoter/types";
/**
 * TribecaSDK.
 */
export declare class TribecaSDK {
    readonly provider: AugmentedProvider;
    readonly programs: TribecaPrograms;
    constructor(provider: AugmentedProvider, programs: TribecaPrograms);
    /**
     * Creates a new instance of the SDK with the given keypair.
     */
    withSigner(signer: Signer): TribecaSDK;
    /**
     * Loads the SDK.
     * @returns
     */
    static load({ provider }: {
        provider: Provider;
    }): TribecaSDK;
    /**
     * Govern program helpers.
     */
    get govern(): GovernWrapper;
    createSimpleElectorate({ proposalThreshold, governor, govTokenMint, baseKP, }: {
        proposalThreshold: BN;
        baseKP?: Keypair;
        governor: PublicKey;
        govTokenMint: PublicKey;
    }): Promise<PendingElectorate>;
    /**
     * Creates a Locker, which is an Electorate that supports vote locking.
     * @returns
     */
    createLocker({ governor, govTokenMint, baseKP, ...providedLockerParams }: {
        baseKP?: Keypair;
        governor: PublicKey;
        govTokenMint: PublicKey;
    } & Partial<LockerParams>): Promise<{
        locker: PublicKey;
        tx: TransactionEnvelope;
    }>;
}
//# sourceMappingURL=sdk.d.ts.map