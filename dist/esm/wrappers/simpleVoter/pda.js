import { __awaiter } from "tslib";
import { utils } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import { TRIBECA_ADDRESSES } from "../../constants";
export const findSimpleElectorateAddress = (base) =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield PublicKey.findProgramAddress(
      [utils.bytes.utf8.encode("SimpleElectorate"), base.toBuffer()],
      TRIBECA_ADDRESSES.SimpleVoter
    );
  });
export const findTokenRecordAddress = (authorityKey, electorateKey) =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield PublicKey.findProgramAddress(
      [
        utils.bytes.utf8.encode("SimpleTokenRecord"),
        authorityKey.toBuffer(),
        electorateKey.toBuffer(),
      ],
      TRIBECA_ADDRESSES.SimpleVoter
    );
  });
//# sourceMappingURL=pda.js.map
