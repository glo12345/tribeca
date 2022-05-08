"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhitelistTesterErrors = exports.WhitelistTesterJSON = void 0;
exports.WhitelistTesterJSON = {
  version: "0.5.6",
  name: "whitelist_tester",
  instructions: [
    {
      name: "lockTokens",
      accounts: [
        {
          name: "locker",
          isMut: true,
          isSigner: false,
        },
        {
          name: "escrow",
          isMut: true,
          isSigner: false,
        },
        {
          name: "escrowTokens",
          isMut: true,
          isSigner: false,
        },
        {
          name: "escrowOwner",
          isMut: false,
          isSigner: true,
        },
        {
          name: "sourceTokens",
          isMut: true,
          isSigner: false,
        },
        {
          name: "lockedVoterProgram",
          isMut: false,
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
        {
          name: "duration",
          type: "i64",
        },
      ],
    },
    {
      name: "lockTokensWithWhitelistEntry",
      accounts: [
        {
          name: "locker",
          isMut: true,
          isSigner: false,
        },
        {
          name: "escrow",
          isMut: true,
          isSigner: false,
        },
        {
          name: "escrowTokens",
          isMut: true,
          isSigner: false,
        },
        {
          name: "escrowOwner",
          isMut: false,
          isSigner: true,
        },
        {
          name: "sourceTokens",
          isMut: true,
          isSigner: false,
        },
        {
          name: "lockedVoterProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "instructionsSysvar",
          isMut: false,
          isSigner: false,
        },
        {
          name: "whitelistEntry",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
        {
          name: "duration",
          type: "i64",
        },
      ],
    },
  ],
};
const anchor_contrib_1 = require("@saberhq/anchor-contrib");
exports.WhitelistTesterErrors = (0, anchor_contrib_1.generateErrorMap)(
  exports.WhitelistTesterJSON
);
//# sourceMappingURL=whitelist_tester.js.map
