import { PublicKey } from "@solana/web3.js";
export declare const findSimpleElectorateAddress: (base: PublicKey) => Promise<[PublicKey, number]>;
export declare const findTokenRecordAddress: (authorityKey: PublicKey, electorateKey: PublicKey) => Promise<[PublicKey, number]>;
//# sourceMappingURL=pda.d.ts.map