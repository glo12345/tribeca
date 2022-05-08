import type { AnchorTypes } from "@saberhq/anchor-contrib";
import type { LockedVoterIDL } from "../idls/locked_voter";
export * from "../idls/locked_voter";
export declare type LockedVoterTypes = AnchorTypes<LockedVoterIDL, {
    locker: LockerData;
    escrow: EscrowData;
    lockerWhitelistEntry: LockerWhitelistEntryData;
}>;
declare type Accounts = LockedVoterTypes["Accounts"];
export declare type LockerData = Accounts["Locker"];
export declare type EscrowData = Accounts["Escrow"];
export declare type LockerWhitelistEntryData = Accounts["LockerWhitelistEntry"];
export declare type LockerParams = LockedVoterTypes["Defined"]["LockerParams"];
export declare type LockedVoterError = LockedVoterTypes["Error"];
export declare type LockedVoterProgram = LockedVoterTypes["Program"];
//# sourceMappingURL=lockedVoter.d.ts.map