export declare type LockedVoterIDL = {
    "version": "0.5.6";
    "name": "locked_voter";
    "instructions": [
        {
            "name": "newLocker";
            "accounts": [
                {
                    "name": "base";
                    "isMut": false;
                    "isSigner": true;
                },
                {
                    "name": "locker";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "tokenMint";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "governor";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "payer";
                    "isMut": true;
                    "isSigner": true;
                },
                {
                    "name": "systemProgram";
                    "isMut": false;
                    "isSigner": false;
                }
            ];
            "args": [
                {
                    "name": "bump";
                    "type": "u8";
                },
                {
                    "name": "params";
                    "type": {
                        "defined": "LockerParams";
                    };
                }
            ];
        },
        {
            "name": "newEscrow";
            "accounts": [
                {
                    "name": "locker";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "escrow";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "escrowOwner";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "payer";
                    "isMut": true;
                    "isSigner": true;
                },
                {
                    "name": "systemProgram";
                    "isMut": false;
                    "isSigner": false;
                }
            ];
            "args": [
                {
                    "name": "bump";
                    "type": "u8";
                }
            ];
        },
        {
            "name": "lock";
            "accounts": [
                {
                    "name": "locker";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "escrow";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "escrowTokens";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "escrowOwner";
                    "isMut": false;
                    "isSigner": true;
                },
                {
                    "name": "sourceTokens";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "tokenProgram";
                    "isMut": false;
                    "isSigner": false;
                }
            ];
            "args": [
                {
                    "name": "amount";
                    "type": "u64";
                },
                {
                    "name": "duration";
                    "type": "i64";
                }
            ];
        },
        {
            "name": "lockWithWhitelist";
            "accounts": [
                {
                    "name": "lock";
                    "accounts": [
                        {
                            "name": "locker";
                            "isMut": true;
                            "isSigner": false;
                        },
                        {
                            "name": "escrow";
                            "isMut": true;
                            "isSigner": false;
                        },
                        {
                            "name": "escrowTokens";
                            "isMut": true;
                            "isSigner": false;
                        },
                        {
                            "name": "escrowOwner";
                            "isMut": false;
                            "isSigner": true;
                        },
                        {
                            "name": "sourceTokens";
                            "isMut": true;
                            "isSigner": false;
                        },
                        {
                            "name": "tokenProgram";
                            "isMut": false;
                            "isSigner": false;
                        }
                    ];
                },
                {
                    "name": "instructionsSysvar";
                    "isMut": false;
                    "isSigner": false;
                }
            ];
            "args": [
                {
                    "name": "amount";
                    "type": "u64";
                },
                {
                    "name": "duration";
                    "type": "i64";
                }
            ];
        },
        {
            "name": "lockWithWhitelistEntry";
            "accounts": [
                {
                    "name": "lock";
                    "accounts": [
                        {
                            "name": "locker";
                            "isMut": true;
                            "isSigner": false;
                        },
                        {
                            "name": "escrow";
                            "isMut": true;
                            "isSigner": false;
                        },
                        {
                            "name": "escrowTokens";
                            "isMut": true;
                            "isSigner": false;
                        },
                        {
                            "name": "escrowOwner";
                            "isMut": false;
                            "isSigner": true;
                        },
                        {
                            "name": "sourceTokens";
                            "isMut": true;
                            "isSigner": false;
                        },
                        {
                            "name": "tokenProgram";
                            "isMut": false;
                            "isSigner": false;
                        }
                    ];
                },
                {
                    "name": "instructionsSysvar";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "whitelistEntry";
                    "isMut": false;
                    "isSigner": false;
                }
            ];
            "args": [
                {
                    "name": "amount";
                    "type": "u64";
                },
                {
                    "name": "duration";
                    "type": "i64";
                }
            ];
        },
        {
            "name": "lockPermissionless";
            "accounts": [
                {
                    "name": "locker";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "escrow";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "escrowTokens";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "escrowOwner";
                    "isMut": false;
                    "isSigner": true;
                },
                {
                    "name": "sourceTokens";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "tokenProgram";
                    "isMut": false;
                    "isSigner": false;
                }
            ];
            "args": [
                {
                    "name": "amount";
                    "type": "u64";
                },
                {
                    "name": "duration";
                    "type": "i64";
                }
            ];
        },
        {
            "name": "exit";
            "accounts": [
                {
                    "name": "locker";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "escrow";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "escrowOwner";
                    "isMut": false;
                    "isSigner": true;
                },
                {
                    "name": "escrowTokens";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "destinationTokens";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "payer";
                    "isMut": true;
                    "isSigner": true;
                },
                {
                    "name": "tokenProgram";
                    "isMut": false;
                    "isSigner": false;
                }
            ];
            "args": [];
        },
        {
            "name": "activateProposal";
            "accounts": [
                {
                    "name": "locker";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "governor";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "proposal";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "escrow";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "escrowOwner";
                    "isMut": false;
                    "isSigner": true;
                },
                {
                    "name": "governProgram";
                    "isMut": false;
                    "isSigner": false;
                }
            ];
            "args": [];
        },
        {
            "name": "castVote";
            "accounts": [
                {
                    "name": "locker";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "escrow";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "voteDelegate";
                    "isMut": false;
                    "isSigner": true;
                },
                {
                    "name": "proposal";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "vote";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "governor";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "governProgram";
                    "isMut": false;
                    "isSigner": false;
                }
            ];
            "args": [
                {
                    "name": "side";
                    "type": "u8";
                }
            ];
        },
        {
            "name": "setVoteDelegate";
            "accounts": [
                {
                    "name": "escrow";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "escrowOwner";
                    "isMut": false;
                    "isSigner": true;
                }
            ];
            "args": [
                {
                    "name": "newDelegate";
                    "type": "publicKey";
                }
            ];
        },
        {
            "name": "setLockerParams";
            "accounts": [
                {
                    "name": "locker";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "governor";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "smartWallet";
                    "isMut": false;
                    "isSigner": true;
                }
            ];
            "args": [
                {
                    "name": "params";
                    "type": {
                        "defined": "LockerParams";
                    };
                }
            ];
        },
        {
            "name": "approveProgramLockPrivilege";
            "accounts": [
                {
                    "name": "locker";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "whitelistEntry";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "governor";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "smartWallet";
                    "isMut": false;
                    "isSigner": true;
                },
                {
                    "name": "executableId";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "whitelistedOwner";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "payer";
                    "isMut": true;
                    "isSigner": true;
                },
                {
                    "name": "systemProgram";
                    "isMut": false;
                    "isSigner": false;
                }
            ];
            "args": [
                {
                    "name": "bump";
                    "type": "u8";
                }
            ];
        },
        {
            "name": "revokeProgramLockPrivilege";
            "accounts": [
                {
                    "name": "locker";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "whitelistEntry";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "governor";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "smartWallet";
                    "isMut": false;
                    "isSigner": true;
                },
                {
                    "name": "payer";
                    "isMut": true;
                    "isSigner": true;
                }
            ];
            "args": [];
        }
    ];
    "accounts": [
        {
            "name": "Locker";
            "type": {
                "kind": "struct";
                "fields": [
                    {
                        "name": "base";
                        "type": "publicKey";
                    },
                    {
                        "name": "bump";
                        "type": "u8";
                    },
                    {
                        "name": "tokenMint";
                        "type": "publicKey";
                    },
                    {
                        "name": "lockedSupply";
                        "type": "u64";
                    },
                    {
                        "name": "governor";
                        "type": "publicKey";
                    },
                    {
                        "name": "params";
                        "type": {
                            "defined": "LockerParams";
                        };
                    }
                ];
            };
        },
        {
            "name": "LockerWhitelistEntry";
            "type": {
                "kind": "struct";
                "fields": [
                    {
                        "name": "bump";
                        "type": "u8";
                    },
                    {
                        "name": "locker";
                        "type": "publicKey";
                    },
                    {
                        "name": "programId";
                        "type": "publicKey";
                    },
                    {
                        "name": "owner";
                        "type": "publicKey";
                    }
                ];
            };
        },
        {
            "name": "Escrow";
            "type": {
                "kind": "struct";
                "fields": [
                    {
                        "name": "locker";
                        "type": "publicKey";
                    },
                    {
                        "name": "owner";
                        "type": "publicKey";
                    },
                    {
                        "name": "bump";
                        "type": "u8";
                    },
                    {
                        "name": "tokens";
                        "type": "publicKey";
                    },
                    {
                        "name": "amount";
                        "type": "u64";
                    },
                    {
                        "name": "escrowStartedAt";
                        "type": "i64";
                    },
                    {
                        "name": "escrowEndsAt";
                        "type": "i64";
                    },
                    {
                        "name": "voteDelegate";
                        "type": "publicKey";
                    }
                ];
            };
        }
    ];
    "types": [
        {
            "name": "LockerParams";
            "type": {
                "kind": "struct";
                "fields": [
                    {
                        "name": "whitelistEnabled";
                        "type": "bool";
                    },
                    {
                        "name": "maxStakeVoteMultiplier";
                        "type": "u8";
                    },
                    {
                        "name": "minStakeDuration";
                        "type": "u64";
                    },
                    {
                        "name": "maxStakeDuration";
                        "type": "u64";
                    },
                    {
                        "name": "proposalActivationMinVotes";
                        "type": "u64";
                    }
                ];
            };
        }
    ];
    "events": [
        {
            "name": "ApproveLockPrivilegeEvent";
            "fields": [
                {
                    "name": "locker";
                    "type": "publicKey";
                    "index": false;
                },
                {
                    "name": "programId";
                    "type": "publicKey";
                    "index": false;
                },
                {
                    "name": "owner";
                    "type": "publicKey";
                    "index": false;
                },
                {
                    "name": "timestamp";
                    "type": "i64";
                    "index": false;
                }
            ];
        },
        {
            "name": "ExitEscrowEvent";
            "fields": [
                {
                    "name": "escrowOwner";
                    "type": "publicKey";
                    "index": false;
                },
                {
                    "name": "locker";
                    "type": "publicKey";
                    "index": false;
                },
                {
                    "name": "timestamp";
                    "type": "i64";
                    "index": false;
                },
                {
                    "name": "lockerSupply";
                    "type": "u64";
                    "index": false;
                },
                {
                    "name": "releasedAmount";
                    "type": "u64";
                    "index": false;
                }
            ];
        },
        {
            "name": "LockEvent";
            "fields": [
                {
                    "name": "locker";
                    "type": "publicKey";
                    "index": false;
                },
                {
                    "name": "escrowOwner";
                    "type": "publicKey";
                    "index": false;
                },
                {
                    "name": "tokenMint";
                    "type": "publicKey";
                    "index": false;
                },
                {
                    "name": "amount";
                    "type": "u64";
                    "index": false;
                },
                {
                    "name": "lockerSupply";
                    "type": "u64";
                    "index": false;
                },
                {
                    "name": "duration";
                    "type": "i64";
                    "index": false;
                },
                {
                    "name": "prevEscrowEndsAt";
                    "type": "i64";
                    "index": false;
                },
                {
                    "name": "nextEscrowEndsAt";
                    "type": "i64";
                    "index": false;
                },
                {
                    "name": "nextEscrowStartedAt";
                    "type": "i64";
                    "index": false;
                }
            ];
        },
        {
            "name": "NewEscrowEvent";
            "fields": [
                {
                    "name": "escrow";
                    "type": "publicKey";
                    "index": false;
                },
                {
                    "name": "escrowOwner";
                    "type": "publicKey";
                    "index": false;
                },
                {
                    "name": "locker";
                    "type": "publicKey";
                    "index": false;
                },
                {
                    "name": "timestamp";
                    "type": "i64";
                    "index": false;
                }
            ];
        },
        {
            "name": "NewLockerEvent";
            "fields": [
                {
                    "name": "governor";
                    "type": "publicKey";
                    "index": false;
                },
                {
                    "name": "locker";
                    "type": "publicKey";
                    "index": false;
                },
                {
                    "name": "tokenMint";
                    "type": "publicKey";
                    "index": false;
                },
                {
                    "name": "params";
                    "type": {
                        "defined": "LockerParams";
                    };
                    "index": false;
                }
            ];
        },
        {
            "name": "RevokeLockPrivilegeEvent";
            "fields": [
                {
                    "name": "locker";
                    "type": "publicKey";
                    "index": false;
                },
                {
                    "name": "programId";
                    "type": "publicKey";
                    "index": false;
                },
                {
                    "name": "timestamp";
                    "type": "i64";
                    "index": false;
                }
            ];
        },
        {
            "name": "LockerSetParamsEvent";
            "fields": [
                {
                    "name": "locker";
                    "type": "publicKey";
                    "index": false;
                },
                {
                    "name": "prevParams";
                    "type": {
                        "defined": "LockerParams";
                    };
                    "index": false;
                },
                {
                    "name": "params";
                    "type": {
                        "defined": "LockerParams";
                    };
                    "index": false;
                }
            ];
        },
        {
            "name": "SetVoteDelegateEvent";
            "fields": [
                {
                    "name": "escrowOwner";
                    "type": "publicKey";
                    "index": false;
                },
                {
                    "name": "oldDelegate";
                    "type": "publicKey";
                    "index": false;
                },
                {
                    "name": "newDelegate";
                    "type": "publicKey";
                    "index": false;
                }
            ];
        }
    ];
    "errors": [
        {
            "code": 6000;
            "name": "ProgramNotWhitelisted";
            "msg": "CPI caller not whitelisted to invoke lock instruction.";
        },
        {
            "code": 6001;
            "name": "LockupDurationTooShort";
            "msg": "Lockup duration must at least be the min stake duration.";
        },
        {
            "code": 6002;
            "name": "LockupDurationTooLong";
            "msg": "Lockup duration must at most be the max stake duration.";
        },
        {
            "code": 6003;
            "name": "RefreshCannotShorten";
            "msg": "A voting escrow refresh cannot shorten the escrow time remaining.";
        },
        {
            "code": 6004;
            "name": "EscrowNotEnded";
            "msg": "Escrow has not ended.";
        },
        {
            "code": 6005;
            "name": "MustProvideWhitelist";
            "msg": "Program whitelist enabled; please provide whitelist entry and instructions sysvar or use the 'lock_with_whitelist' instruction.";
        },
        {
            "code": 6006;
            "name": "EscrowOwnerNotWhitelisted";
            "msg": "CPI caller not whitelisted for escrow owner to invoke lock instruction.";
        },
        {
            "code": 6007;
            "name": "MustCallLockWithWhitelistEntry";
            "msg": "Must call `lock_with_whitelist_entry` to lock via CPI.";
        },
        {
            "code": 6008;
            "name": "MustCallLockPermissionless";
            "msg": "Must call `lock_permissionless` since this DAO does not have a CPI whitelist.";
        }
    ];
};
export declare const LockedVoterJSON: LockedVoterIDL;
export declare const LockedVoterErrors: import("@saberhq/anchor-contrib").ErrorMap<LockedVoterIDL>;
//# sourceMappingURL=locked_voter.d.ts.map