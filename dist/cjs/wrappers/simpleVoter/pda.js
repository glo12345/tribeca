"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findTokenRecordAddress = exports.findSimpleElectorateAddress = void 0;
const tslib_1 = require("tslib");
const anchor_1 = require("@project-serum/anchor");
const web3_js_1 = require("@solana/web3.js");
const constants_1 = require("../../constants");
const findSimpleElectorateAddress = (base) =>
  tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield web3_js_1.PublicKey.findProgramAddress(
      [anchor_1.utils.bytes.utf8.encode("SimpleElectorate"), base.toBuffer()],
      constants_1.TRIBECA_ADDRESSES.SimpleVoter
    );
  });
exports.findSimpleElectorateAddress = findSimpleElectorateAddress;
const findTokenRecordAddress = (authorityKey, electorateKey) =>
  tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield web3_js_1.PublicKey.findProgramAddress(
      [
        anchor_1.utils.bytes.utf8.encode("SimpleTokenRecord"),
        authorityKey.toBuffer(),
        electorateKey.toBuffer(),
      ],
      constants_1.TRIBECA_ADDRESSES.SimpleVoter
    );
  });
exports.findTokenRecordAddress = findTokenRecordAddress;
//# sourceMappingURL=pda.js.map
