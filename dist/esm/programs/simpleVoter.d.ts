import type { AnchorTypes } from "@saberhq/anchor-contrib";
import type { SimpleVoterIDL } from "../idls/simple_voter";
export * from "../idls/simple_voter";
export declare type SimpleVoterTypes = AnchorTypes<SimpleVoterIDL, {
    electorate: ElectorateData;
    tokenRecord: TokenRecordData;
}>;
declare type Accounts = SimpleVoterTypes["Accounts"];
export declare type ElectorateData = Accounts["Electorate"];
export declare type TokenRecordData = Accounts["TokenRecord"];
export declare type SimpleVoterProgram = SimpleVoterTypes["Program"];
//# sourceMappingURL=simpleVoter.d.ts.map