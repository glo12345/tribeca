/// <reference types="bn.js" />
import { PublicKey } from "@solana/web3.js";
import type { GovernanceParameters, GovernProgram, GovernTypes, LockedVoterProgram, LockedVoterTypes, LockerParams, SimpleVoterProgram, SimpleVoterTypes } from "./programs";
/**
 * Tribeca program types.
 */
export interface TribecaPrograms {
    SimpleVoter: SimpleVoterProgram;
    Govern: GovernProgram;
    LockedVoter: LockedVoterProgram;
}
export declare const TRIBECA_ADDRESSES: {
    SimpleVoter: PublicKey;
    Govern: PublicKey;
    LockedVoter: PublicKey;
};
/**
 * Program IDLs.
 */
export declare const TRIBECA_IDLS: {
    SimpleVoter: import("./programs").SimpleVoterIDL;
    Govern: import("./programs").GovernIDL;
    LockedVoter: import("./programs").LockedVoterIDL;
};
/**
 * Coders.
 */
export declare const TRIBECA_CODERS: {
    SimpleVoter: import("@saberhq/anchor-contrib").SuperCoder<SimpleVoterTypes>;
    Govern: import("@saberhq/anchor-contrib").SuperCoder<GovernTypes>;
    LockedVoter: import("@saberhq/anchor-contrib").SuperCoder<LockedVoterTypes>;
};
export declare const DEFAULT_DECIMALS = 6;
export declare const ONE_DAY: import("bn.js");
/**
 * Number of seconds in one year.
 */
export declare const ONE_YEAR: import("bn.js");
export declare const DEFAULT_QUORUM_VOTES: import("bn.js");
export declare const DEFAULT_PROPOSAL_THRESHOLD: import("bn.js");
export declare const DEFAULT_VOTE_DELAY: import("bn.js");
export declare const DEFAULT_VOTE_PERIOD: import("bn.js");
/**
 * Default parameters for a Governor.
 */
export declare const DEFAULT_GOVERNANCE_PARAMETERS: GovernanceParameters;
/**
 * Default parameters for a Locker.
 */
export declare const DEFAULT_LOCKER_PARAMS: LockerParams;
//# sourceMappingURL=constants.d.ts.map