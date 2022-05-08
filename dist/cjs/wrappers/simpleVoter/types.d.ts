import type { TransactionEnvelope } from "@saberhq/solana-contrib";
import type { PublicKey } from "@solana/web3.js";
import type BN from "bn.js";
import type { VoteSide } from "../govern/types";
export declare type PendingProposal = {
    proposal: PublicKey;
    index: BN;
    tx: TransactionEnvelope;
};
export declare type PendingElectorate = {
    electorate: PublicKey;
    tx: TransactionEnvelope;
};
export declare type VoteArgs = {
    voteSide: VoteSide;
    proposal: PublicKey;
    authority?: PublicKey;
    reason?: string | undefined;
};
//# sourceMappingURL=types.d.ts.map