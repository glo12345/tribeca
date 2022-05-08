import type { GokiSDK, SmartWalletWrapper } from "@gokiprotocol/client";
import type { TransactionEnvelope } from "@saberhq/solana-contrib";
import type { PublicKey } from "@solana/web3.js";
import { Keypair } from "@solana/web3.js";
import type { GovernanceParameters, TribecaSDK } from "../..";
import type { GovernorWrapper } from "..";
/**
 * Creates a Governor.
 * @returns
 */
export declare const createGovernorWithElectorate: ({ createElectorate, sdk, gokiSDK, owners, governanceParameters, govBaseKP, smartWalletBaseKP, }: {
    createElectorate: (governor: PublicKey) => Promise<{
        key: PublicKey;
        tx: TransactionEnvelope;
    }>;
    sdk: TribecaSDK;
    gokiSDK: GokiSDK;
    owners?: PublicKey[];
    governanceParameters?: Partial<GovernanceParameters>;
    /**
     * Base of the governor.
     */
    govBaseKP?: Keypair;
    /**
     * Base of the smart wallet.
     */
    smartWalletBaseKP?: Keypair;
}) => Promise<{
    governorWrapper: GovernorWrapper;
    smartWalletWrapper: SmartWalletWrapper;
    electorate: PublicKey;
    createTXs: {
        title: string;
        tx: TransactionEnvelope;
    }[];
}>;
//# sourceMappingURL=setup.d.ts.map