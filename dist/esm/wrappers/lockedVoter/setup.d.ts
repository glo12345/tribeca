import type { GokiSDK, SmartWalletWrapper } from "@gokiprotocol/client";
import type { TransactionEnvelope } from "@saberhq/solana-contrib";
import type { PublicKey } from "@solana/web3.js";
import { Keypair } from "@solana/web3.js";
import type { GovernanceParameters, GovernorWrapper, LockerParams } from "../..";
import type { TribecaSDK } from "../../sdk";
import { LockerWrapper } from "./locker";
/**
 * Creates a new Locker.
 * @returns
 */
export declare const createLocker: ({ sdk, gokiSDK, govTokenMint, owners, governanceParameters, lockerParams, governorBaseKP, lockerBaseKP, smartWalletBaseKP, }: {
    sdk: TribecaSDK;
    gokiSDK: GokiSDK;
    govTokenMint: PublicKey;
    owners?: PublicKey[];
    governanceParameters?: Partial<GovernanceParameters>;
    lockerParams?: Partial<LockerParams>;
    /**
     * Base of the governor.
     */
    governorBaseKP?: Keypair;
    /**
     * Base of the governor.
     */
    lockerBaseKP?: Keypair;
    /**
     * Base of the smart wallet.
     */
    smartWalletBaseKP?: Keypair;
}) => Promise<{
    governorWrapper: GovernorWrapper;
    smartWalletWrapper: SmartWalletWrapper;
    lockerWrapper: LockerWrapper;
    createTXs: {
        title: string;
        tx: TransactionEnvelope;
    }[];
}>;
//# sourceMappingURL=setup.d.ts.map