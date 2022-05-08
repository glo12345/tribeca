import { PublicKey } from "@solana/web3.js";
export declare const findLockerAddress: (base: PublicKey) => Promise<[PublicKey, number]>;
export declare const findEscrowAddress: (locker: PublicKey, authority: PublicKey) => Promise<[PublicKey, number]>;
export declare const findWhitelistAddress: (locker: PublicKey, programId: PublicKey, owner: PublicKey | null) => Promise<[PublicKey, number]>;
//# sourceMappingURL=pda.d.ts.map