"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findWhitelistAddress =
  exports.findEscrowAddress =
  exports.findLockerAddress =
    void 0;
const tslib_1 = require("tslib");
const anchor_1 = require("@project-serum/anchor");
const web3_js_1 = require("@solana/web3.js");
const constants_1 = require("../../constants");
const findLockerAddress = (base) =>
  tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield web3_js_1.PublicKey.findProgramAddress(
      [anchor_1.utils.bytes.utf8.encode("Locker"), base.toBuffer()],
      constants_1.TRIBECA_ADDRESSES.LockedVoter
    );
  });
exports.findLockerAddress = findLockerAddress;
const findEscrowAddress = (locker, authority) =>
  tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield web3_js_1.PublicKey.findProgramAddress(
      [
        anchor_1.utils.bytes.utf8.encode("Escrow"),
        locker.toBuffer(),
        authority.toBuffer(),
      ],
      constants_1.TRIBECA_ADDRESSES.LockedVoter
    );
  });
exports.findEscrowAddress = findEscrowAddress;
const findWhitelistAddress = (locker, programId, owner) =>
  tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield web3_js_1.PublicKey.findProgramAddress(
      [
        anchor_1.utils.bytes.utf8.encode("LockerWhitelistEntry"),
        locker.toBuffer(),
        programId.toBuffer(),
        owner ? owner.toBuffer() : web3_js_1.SystemProgram.programId.toBuffer(),
      ],
      constants_1.TRIBECA_ADDRESSES.LockedVoter
    );
  });
exports.findWhitelistAddress = findWhitelistAddress;
//# sourceMappingURL=pda.js.map
