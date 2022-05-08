import type { PublicKey } from "@solana/web3.js";
import { Keypair } from "@solana/web3.js";
import type BN from "bn.js";
import type { GovernProgram, VoteData } from "../../programs/govern";
import type { TribecaSDK } from "../../sdk";
import type { PendingGovernor } from "./types";
export declare class GovernWrapper {
    readonly sdk: TribecaSDK;
    readonly program: GovernProgram;
    constructor(sdk: TribecaSDK);
    get provider(): import("@saberhq/solana-contrib").AugmentedProvider;
    fetchVote(key: PublicKey): Promise<VoteData>;
    createGovernor({ electorate, smartWallet, baseKP, ...governorParams }: {
        electorate: PublicKey;
        smartWallet: PublicKey;
        baseKP?: Keypair;
        quorumVotes?: BN;
        votingDelay?: BN;
        votingPeriod?: BN;
        smartWalletOwner?: PublicKey;
    }): Promise<PendingGovernor>;
}
//# sourceMappingURL=govern.d.ts.map