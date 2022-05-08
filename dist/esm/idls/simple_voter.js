export const SimpleVoterJSON = {
  version: "0.5.6",
  name: "simple_voter",
  instructions: [
    {
      name: "initializeElectorate",
      accounts: [
        {
          name: "base",
          isMut: false,
          isSigner: true,
        },
        {
          name: "electorate",
          isMut: true,
          isSigner: false,
        },
        {
          name: "governor",
          isMut: false,
          isSigner: false,
        },
        {
          name: "govTokenMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "payer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "bump",
          type: "u8",
        },
        {
          name: "proposalThreshold",
          type: "u64",
        },
      ],
    },
    {
      name: "initializeTokenRecord",
      accounts: [
        {
          name: "authority",
          isMut: false,
          isSigner: true,
        },
        {
          name: "tokenRecord",
          isMut: true,
          isSigner: false,
        },
        {
          name: "electorate",
          isMut: true,
          isSigner: false,
        },
        {
          name: "govTokenVault",
          isMut: false,
          isSigner: false,
        },
        {
          name: "payer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "bump",
          type: "u8",
        },
      ],
    },
    {
      name: "activateProposal",
      accounts: [
        {
          name: "electorate",
          isMut: false,
          isSigner: false,
        },
        {
          name: "governor",
          isMut: false,
          isSigner: false,
        },
        {
          name: "proposal",
          isMut: true,
          isSigner: false,
        },
        {
          name: "governProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "depositTokens",
      accounts: [
        {
          name: "authority",
          isMut: false,
          isSigner: true,
        },
        {
          name: "tokenRecord",
          isMut: true,
          isSigner: false,
        },
        {
          name: "govTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "govTokenVault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
      ],
    },
    {
      name: "withdrawTokens",
      accounts: [
        {
          name: "authority",
          isMut: false,
          isSigner: true,
        },
        {
          name: "tokenRecord",
          isMut: true,
          isSigner: false,
        },
        {
          name: "govTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "govTokenVault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
      ],
    },
    {
      name: "castVotes",
      accounts: [
        {
          name: "electorate",
          isMut: false,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: true,
        },
        {
          name: "proposal",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenRecord",
          isMut: true,
          isSigner: false,
        },
        {
          name: "vote",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tribeca",
          accounts: [
            {
              name: "governor",
              isMut: true,
              isSigner: false,
            },
            {
              name: "program",
              isMut: false,
              isSigner: false,
            },
          ],
        },
      ],
      args: [
        {
          name: "voteSide",
          type: "u8",
        },
      ],
    },
    {
      name: "withdrawVotes",
      accounts: [
        {
          name: "electorate",
          isMut: false,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: true,
        },
        {
          name: "proposal",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenRecord",
          isMut: true,
          isSigner: false,
        },
        {
          name: "vote",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tribeca",
          accounts: [
            {
              name: "governor",
              isMut: true,
              isSigner: false,
            },
            {
              name: "program",
              isMut: false,
              isSigner: false,
            },
          ],
        },
      ],
      args: [],
    },
    {
      name: "finalizeVotes",
      accounts: [
        {
          name: "authority",
          isMut: false,
          isSigner: true,
        },
        {
          name: "governor",
          isMut: true,
          isSigner: false,
        },
        {
          name: "proposal",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenRecord",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: "Electorate",
      type: {
        kind: "struct",
        fields: [
          {
            name: "bump",
            type: "u8",
          },
          {
            name: "base",
            type: "publicKey",
          },
          {
            name: "governor",
            type: "publicKey",
          },
          {
            name: "govTokenMint",
            type: "publicKey",
          },
          {
            name: "proposalThreshold",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "TokenRecord",
      type: {
        kind: "struct",
        fields: [
          {
            name: "bump",
            type: "u8",
          },
          {
            name: "authority",
            type: "publicKey",
          },
          {
            name: "electorate",
            type: "publicKey",
          },
          {
            name: "tokenVaultKey",
            type: "publicKey",
          },
          {
            name: "balance",
            type: "u64",
          },
          {
            name: "unfinalizedVotes",
            type: "u64",
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: "BelowProposingThreshold",
      msg: "Below proposing threshold.",
    },
  ],
};
import { generateErrorMap } from "@saberhq/anchor-contrib";
export const SimpleVoterErrors = generateErrorMap(SimpleVoterJSON);
//# sourceMappingURL=simple_voter.js.map
