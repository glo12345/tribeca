import { TransactionEnvelope } from "@saberhq/solana-contrib";
import type { PublicKey, TransactionInstruction } from "@solana/web3.js";
import type BN from "bn.js";
import type { GovernanceParameters, GovernorData, ProposalData, ProposalInstruction, ProposalMetaData } from "../../programs/govern";
import type { TribecaSDK } from "../../sdk";
import type { PendingProposal } from "../simpleVoter/types";
/**
 * Wrapper around a Governor.
 */
export declare class GovernorWrapper {
    readonly sdk: TribecaSDK;
    readonly governorKey: PublicKey;
    private _governor;
    constructor(sdk: TribecaSDK, governorKey: PublicKey);
    get provider(): import("@saberhq/solana-contrib").AugmentedProvider;
    get program(): import("@saberhq/anchor-contrib").AnchorProgram<import("../../idls/govern").GovernIDL, {
        governor: {
            base: PublicKey;
            smartWallet: PublicKey;
            bump: number;
            electorate: PublicKey;
            params: {
                quorumVotes: BN;
                votingDelay: BN;
                votingPeriod: BN;
                timelockDelaySeconds: BN;
            };
            proposalCount: BN;
        };
        proposal: {
            governor: PublicKey;
            bump: number;
            proposer: PublicKey;
            instructions: {
                programId: PublicKey;
                keys: import("@solana/web3.js").AccountMeta[];
                data: Uint8Array;
            }[];
            index: BN;
            quorumVotes: BN;
            forVotes: BN;
            againstVotes: BN;
            abstainVotes: BN;
            canceledAt: BN;
            createdAt: BN;
            activatedAt: BN;
            votingEndsAt: BN;
            queuedAt: BN;
            queuedTransaction: PublicKey;
        };
        vote: {
            bump: number;
            proposal: PublicKey;
            voter: PublicKey;
            side: number;
            weight: BN;
        };
        proposalMeta: ProposalMetaData;
    }, import("@saberhq/anchor-contrib").AnchorDefined<import("../../idls/govern").GovernIDL, {
        ProposalInstruction: ProposalInstruction;
        ProposalAccountMeta: import("@solana/web3.js").AccountMeta;
        GovernanceParameters: {
            quorumVotes: BN;
            votingDelay: BN;
            votingPeriod: BN;
            timelockDelaySeconds: BN;
        };
    }>, {
        createGovernor: {
            accounts: [{
                name: "base";
                isMut: false;
                isSigner: true;
            }, {
                name: "governor";
                isMut: true;
                isSigner: false;
            }, {
                name: "smartWallet";
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
            args: [number, PublicKey, {
                quorumVotes: BN;
                votingDelay: BN;
                votingPeriod: BN;
                timelockDelaySeconds: BN;
            }] & unknown[];
            namedArgs: {
                bump: number;
                electorate: PublicKey;
                params: {
                    quorumVotes: BN;
                    votingDelay: BN;
                    votingPeriod: BN;
                    timelockDelaySeconds: BN;
                };
            };
        };
        createProposal: {
            accounts: [{
                name: "governor";
                isMut: true;
                isSigner: false;
            }, {
                name: "proposal";
                isMut: true;
                isSigner: false;
            }, {
                name: "proposer";
                isMut: false;
                isSigner: true;
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
                programId: PublicKey;
                keys: import("@solana/web3.js").AccountMeta[];
                data: Uint8Array;
            }[]] & unknown[];
            namedArgs: {
                bump: number;
                instructions: {
                    programId: PublicKey;
                    keys: import("@solana/web3.js").AccountMeta[];
                    data: Uint8Array;
                }[];
            };
        };
        activateProposal: {
            accounts: [{
                name: "governor"; /**
                 * Creates a ProposalMeta for a proposal.
                 * Only the Proposer may call this.
                 *
                 * @returns
                 */
                isMut: false;
                isSigner: false;
            }, {
                name: "proposal";
                isMut: true;
                isSigner: false;
            }, {
                name: "electorate";
                isMut: false;
                isSigner: true;
            }];
            args: [] & unknown[];
            namedArgs: {};
        };
        cancelProposal: {
            accounts: [{
                name: "governor";
                isMut: false;
                isSigner: false;
            }, {
                name: "proposal";
                isMut: true;
                isSigner: false;
            }, {
                name: "proposer";
                isMut: false;
                isSigner: true;
            }];
            args: [] & unknown[];
            namedArgs: {};
        };
        queueProposal: {
            accounts: [{
                name: "governor";
                isMut: false;
                isSigner: false;
            }, {
                name: "proposal";
                isMut: true;
                isSigner: false;
            }, {
                name: "transaction";
                isMut: true;
                isSigner: false;
            }, {
                name: "smartWallet";
                isMut: true;
                isSigner: false;
            }, {
                name: "payer";
                isMut: true;
                isSigner: true;
            }, {
                name: "smartWalletProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [number] & unknown[];
            namedArgs: {
                txBump: number;
            };
        };
        newVote: {
            accounts: [{
                name: "proposal";
                isMut: false;
                isSigner: false;
            }, {
                name: "vote";
                isMut: true;
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
            args: [number, PublicKey] & unknown[];
            namedArgs: {
                bump: number;
                voter: PublicKey;
            };
        };
        setVote: {
            accounts: [{
                name: "governor";
                isMut: false;
                isSigner: false;
            }, {
                name: "proposal";
                isMut: true;
                isSigner: false;
            }, {
                name: "vote";
                isMut: true;
                isSigner: false;
            }, {
                name: "electorate";
                isMut: false;
                isSigner: true;
            }];
            args: [number, BN] & unknown[];
            namedArgs: {
                side: number;
                weight: BN;
            };
        };
        setGovernanceParams: {
            accounts: [{
                name: "governor";
                isMut: true;
                isSigner: false;
            }, {
                name: "smartWallet";
                isMut: false;
                isSigner: true;
            }];
            args: [{
                quorumVotes: BN;
                votingDelay: BN;
                votingPeriod: BN;
                timelockDelaySeconds: BN;
            }] & unknown[];
            namedArgs: {
                params: {
                    quorumVotes: BN;
                    votingDelay: BN;
                    votingPeriod: BN;
                    timelockDelaySeconds: BN;
                };
            };
        };
        setElectorate: {
            accounts: [{
                name: "governor";
                isMut: true;
                isSigner: false;
            }, {
                name: "smartWallet";
                isMut: false;
                isSigner: true;
            }];
            args: [PublicKey] & unknown[];
            namedArgs: {
                newElectorate: PublicKey;
            };
        };
        createProposalMeta: {
            accounts: [{
                name: "proposal";
                isMut: false;
                isSigner: false;
            }, {
                name: "proposer";
                isMut: false;
                isSigner: true;
            }, {
                name: "proposalMeta";
                isMut: true;
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
            args: [number, string, string] & unknown[];
            namedArgs: {
                bump: number;
                title: string;
                descriptionLink: string;
            };
        };
    }, {}>;
    reload(): Promise<GovernorData>;
    data(): Promise<GovernorData>;
    findProposalAddress(index: BN): Promise<PublicKey>;
    fetchProposalByKey(key: PublicKey): Promise<ProposalData>;
    fetchProposal(index: BN): Promise<ProposalData>;
    fetchProposalMeta(proposalKey: PublicKey): Promise<ProposalMetaData>;
    /**
     * Creates a ProposalMeta for a proposal.
     * Only the Proposer may call this.
     *
     * @returns
     */
    createProposalMeta({ proposal, proposer, title, descriptionLink, }: {
        proposal: PublicKey;
        proposer?: PublicKey;
        title: string;
        descriptionLink: string;
    }): Promise<TransactionEnvelope>;
    /**
     * Creates a new Proposal.
     * @returns
     */
    createProposal({ proposer, instructions, }: {
        proposer?: PublicKey;
        instructions: ProposalInstruction[];
    }): Promise<PendingProposal>;
    /**
     * Queues a Proposal for execution by the Smart Wallet.
     * @returns
     */
    queueProposal({ index, smartWalletProgram, payer, }: {
        index: BN;
        smartWalletProgram?: PublicKey;
        payer?: PublicKey;
    }): Promise<TransactionEnvelope>;
    /**
     * Cancel a new Proposal.
     * @returns
     */
    cancelProposal({ proposal, proposer, }: {
        proposal: PublicKey;
        proposer?: PublicKey;
    }): TransactionEnvelope;
    getOrCreateVote({ proposal, voter, payer, }: {
        proposal: PublicKey;
        voter?: PublicKey;
        payer?: PublicKey;
    }): Promise<{
        voteKey: PublicKey;
        instruction: TransactionInstruction | null;
    }>;
    createVoteIx({ proposal, voteKeyAndBump, voter, payer, }: {
        proposal: PublicKey;
        voteKeyAndBump?: [PublicKey, number];
        voter?: PublicKey;
        payer?: PublicKey;
    }): Promise<TransactionInstruction>;
    setGovernanceParamsIx(newParams: GovernanceParameters): Promise<TransactionInstruction>;
}
//# sourceMappingURL=governor.d.ts.map