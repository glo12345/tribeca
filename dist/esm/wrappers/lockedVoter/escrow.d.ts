import type { TransactionEnvelope } from "@saberhq/solana-contrib";
import type { TokenAmount } from "@saberhq/token-utils";
import type { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import type { TribecaSDK } from "../../sdk";
import type { VoteSide } from "../govern/types";
export declare class VoteEscrow {
    readonly sdk: TribecaSDK;
    readonly locker: PublicKey;
    readonly governorKey: PublicKey;
    readonly escrowKey: PublicKey;
    readonly owner: PublicKey;
    private _lockerData;
    private _escrowData;
    constructor(sdk: TribecaSDK, locker: PublicKey, governorKey: PublicKey, escrowKey: PublicKey, owner: PublicKey);
    get provider(): import("@saberhq/solana-contrib").AugmentedProvider;
    get lockerProgram(): import("@saberhq/anchor-contrib").AnchorProgram<import("../../idls/locked_voter").LockedVoterIDL, {
        locker: {
            base: PublicKey;
            governor: PublicKey;
            bump: number;
            params: {
                whitelistEnabled: boolean;
                maxStakeVoteMultiplier: number;
                minStakeDuration: BN;
                maxStakeDuration: BN;
                proposalActivationMinVotes: BN;
            };
            tokenMint: PublicKey;
            lockedSupply: BN;
        };
        escrow: {
            bump: number;
            locker: PublicKey;
            amount: BN;
            voteDelegate: PublicKey;
            owner: PublicKey;
            tokens: PublicKey;
            escrowStartedAt: BN;
            escrowEndsAt: BN;
        };
        lockerWhitelistEntry: {
            bump: number;
            programId: PublicKey;
            locker: PublicKey;
            owner: PublicKey;
        };
    }, import("@saberhq/anchor-contrib").AnchorDefined<import("../../idls/locked_voter").LockedVoterIDL, Record<string, never>>, {
        activateProposal: {
            accounts: [{
                name: "locker";
                isMut: false;
                isSigner: false;
            }, {
                name: "governor";
                isMut: false;
                isSigner: false;
            }, {
                name: "proposal";
                isMut: true;
                isSigner: false;
            }, {
                name: "escrow";
                isMut: false;
                isSigner: false;
            }, {
                name: "escrowOwner";
                isMut: false;
                isSigner: true;
            }, {
                name: "governProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [] & unknown[];
            namedArgs: {};
        };
        newLocker: {
            accounts: [{
                name: "base";
                isMut: false;
                isSigner: true;
            }, {
                name: "locker";
                isMut: true;
                isSigner: false;
            }, {
                name: "tokenMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "governor";
                isMut: false;
                isSigner: false;
            }, {
                name: "payer";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [number, {
                whitelistEnabled: boolean;
                maxStakeVoteMultiplier: number;
                minStakeDuration: BN;
                maxStakeDuration: BN;
                proposalActivationMinVotes: BN;
            }] & unknown[];
            namedArgs: {
                bump: number;
                params: {
                    whitelistEnabled: boolean;
                    maxStakeVoteMultiplier: number;
                    minStakeDuration: BN;
                    maxStakeDuration: BN;
                    proposalActivationMinVotes: BN;
                };
            };
        };
        newEscrow: {
            accounts: [{
                name: "locker";
                isMut: false;
                isSigner: false;
            }, {
                name: "escrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "escrowOwner";
                isMut: false;
                isSigner: false;
            }, {
                name: "payer";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [number] & unknown[];
            namedArgs: {
                bump: number;
            };
        };
        lock: {
            accounts: [{
                name: "locker";
                isMut: true;
                isSigner: false;
            }, {
                name: "escrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "escrowTokens";
                isMut: true;
                isSigner: false;
            }, {
                name: "escrowOwner";
                isMut: false;
                isSigner: true;
            }, {
                name: "sourceTokens";
                isMut: true;
                isSigner: false;
            }, {
                name: "tokenProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [BN, BN] & unknown[];
            namedArgs: {
                amount: BN;
                duration: BN;
            };
        };
        lockWithWhitelist: {
            accounts: [{
                name: "lock";
                accounts: [{
                    name: "locker";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "escrow";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "escrowTokens";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "escrowOwner";
                    isMut: false;
                    isSigner: true;
                }, {
                    name: "sourceTokens";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "tokenProgram";
                    isMut: false;
                    isSigner: false;
                }];
            }, {
                name: "instructionsSysvar";
                isMut: false;
                isSigner: false;
            }];
            args: [BN, BN] & unknown[];
            namedArgs: {
                amount: BN;
                duration: BN;
            };
        };
        lockWithWhitelistEntry: {
            accounts: [{
                name: "lock";
                accounts: [{
                    name: "locker";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "escrow";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "escrowTokens";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "escrowOwner";
                    isMut: false;
                    isSigner: true;
                }, {
                    name: "sourceTokens";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "tokenProgram";
                    isMut: false;
                    isSigner: false;
                }];
            }, {
                name: "instructionsSysvar";
                isMut: false;
                isSigner: false;
            }, {
                name: "whitelistEntry";
                isMut: false;
                isSigner: false;
            }];
            args: [BN, BN] & unknown[];
            namedArgs: {
                amount: BN;
                duration: BN;
            };
        };
        lockPermissionless: {
            accounts: [{
                name: "locker";
                isMut: true;
                isSigner: false;
            }, {
                name: "escrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "escrowTokens";
                isMut: true;
                isSigner: false;
            }, {
                name: "escrowOwner";
                isMut: false;
                isSigner: true;
            }, {
                name: "sourceTokens";
                isMut: true;
                isSigner: false;
            }, {
                name: "tokenProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [BN, BN] & unknown[];
            namedArgs: {
                amount: BN;
                duration: BN;
            };
        };
        exit: {
            accounts: [{
                name: "locker";
                isMut: true;
                isSigner: false;
            }, {
                name: "escrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "escrowOwner";
                isMut: false;
                isSigner: true;
            }, {
                name: "escrowTokens";
                isMut: true;
                isSigner: false;
            }, {
                name: "destinationTokens";
                isMut: true;
                isSigner: false;
            }, {
                name: "payer";
                isMut: true;
                isSigner: true;
            }, {
                name: "tokenProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [] & unknown[];
            namedArgs: {};
        };
        castVote: {
            accounts: [{
                name: "locker";
                isMut: false;
                isSigner: false;
            }, {
                name: "escrow";
                isMut: false;
                isSigner: false;
            }, {
                name: "voteDelegate";
                isMut: false;
                isSigner: true;
            }, {
                name: "proposal";
                isMut: true;
                isSigner: false;
            }, {
                name: "vote";
                isMut: true;
                isSigner: false;
            }, {
                name: "governor";
                isMut: false;
                isSigner: false;
            }, {
                name: "governProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [number] & unknown[];
            namedArgs: {
                side: number;
            };
        };
        setVoteDelegate: {
            accounts: [{
                name: "escrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "escrowOwner";
                isMut: false;
                isSigner: true;
            }];
            args: [PublicKey] & unknown[];
            namedArgs: {
                newDelegate: PublicKey;
            };
        };
        setLockerParams: {
            accounts: [{
                name: "locker";
                isMut: true;
                isSigner: false;
            }, {
                name: "governor";
                isMut: false;
                isSigner: false;
            }, {
                name: "smartWallet";
                isMut: false;
                isSigner: true;
            }];
            args: [{
                whitelistEnabled: boolean;
                maxStakeVoteMultiplier: number;
                minStakeDuration: BN;
                maxStakeDuration: BN;
                proposalActivationMinVotes: BN;
            }] & unknown[];
            namedArgs: {
                params: {
                    whitelistEnabled: boolean;
                    maxStakeVoteMultiplier: number;
                    minStakeDuration: BN;
                    maxStakeDuration: BN;
                    proposalActivationMinVotes: BN;
                };
            };
        };
        approveProgramLockPrivilege: {
            accounts: [{
                name: "locker";
                isMut: false;
                isSigner: false;
            }, {
                name: "whitelistEntry";
                isMut: true;
                isSigner: false;
            }, {
                name: "governor";
                isMut: false;
                isSigner: false;
            }, {
                name: "smartWallet";
                isMut: false;
                isSigner: true;
            }, {
                name: "executableId";
                isMut: false;
                isSigner: false;
            }, {
                name: "whitelistedOwner";
                isMut: false;
                isSigner: false;
            }, {
                name: "payer";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [number] & unknown[];
            namedArgs: {
                bump: number;
            };
        };
        revokeProgramLockPrivilege: {
            accounts: [{
                name: "locker";
                isMut: false;
                isSigner: false;
            }, {
                name: "whitelistEntry";
                isMut: true;
                isSigner: false;
            }, {
                name: "governor";
                isMut: false;
                isSigner: false;
            }, {
                name: "smartWallet";
                isMut: false;
                isSigner: true;
            }, {
                name: "payer";
                isMut: true;
                isSigner: true;
            }];
            args: [] & unknown[];
            namedArgs: {};
        };
    }, {}>;
    /**
     * Locker data.
     */
    lockerData(): Promise<{
        base: PublicKey;
        governor: PublicKey;
        bump: number;
        params: {
            whitelistEnabled: boolean;
            maxStakeVoteMultiplier: number;
            minStakeDuration: BN;
            maxStakeDuration: BN;
            proposalActivationMinVotes: BN;
        };
        tokenMint: PublicKey;
        lockedSupply: BN;
    }>;
    /**
     * Escrow data.
     */
    data(): Promise<{
        bump: number;
        locker: PublicKey;
        amount: BN;
        voteDelegate: PublicKey;
        owner: PublicKey;
        tokens: PublicKey;
        escrowStartedAt: BN;
        escrowEndsAt: BN;
    }>;
    /**
     * Creates a function to calculate the voting power of this escrow.
     * @returns
     */
    makeCalculateVotingPower(): Promise<(timestampSeconds: number) => BN>;
    /**
     * Calculates the voting power of this escrow.
     * @param time Optional time to calculate power for.
     * @returns
     */
    calculateVotingPower(time?: Date): Promise<BN>;
    /**
     * Activates a proposal.
     * @returns
     */
    activateProposal(proposal: PublicKey): TransactionEnvelope;
    /**
     * Casts a vote on a proposal.
     * @returns
     */
    castVote({ proposal, side, }: {
        proposal: PublicKey;
        side: VoteSide;
    }): Promise<TransactionEnvelope>;
    /**
     * Locks tokens into the escrow.
     * @param amount
     * @param durationSeconds The duration of the lock, in seconds
     * @param authority
     * @returns
     */
    lock(amount: TokenAmount, durationSeconds: number): Promise<TransactionEnvelope>;
    /**
     * Exits the escrow.
     * @returns
     */
    exit(): Promise<TransactionEnvelope>;
}
//# sourceMappingURL=escrow.d.ts.map