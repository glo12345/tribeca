import { __awaiter } from "tslib";
import { utils } from "@project-serum/anchor";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { TRIBECA_ADDRESSES } from "../../constants";
export const findLockerAddress = (base) =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield PublicKey.findProgramAddress(
      [utils.bytes.utf8.encode("Locker"), base.toBuffer()],
      TRIBECA_ADDRESSES.LockedVoter
    );
  });
export const findEscrowAddress = (locker, authority) =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield PublicKey.findProgramAddress(
      [
        utils.bytes.utf8.encode("Escrow"),
        locker.toBuffer(),
        authority.toBuffer(),
      ],
      TRIBECA_ADDRESSES.LockedVoter
    );
  });
export const findWhitelistAddress = (locker, programId, owner) =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield PublicKey.findProgramAddress(
      [
        utils.bytes.utf8.encode("LockerWhitelistEntry"),
        locker.toBuffer(),
        programId.toBuffer(),
        owner ? owner.toBuffer() : SystemProgram.programId.toBuffer(),
      ],
      TRIBECA_ADDRESSES.LockedVoter
    );
  });
//# sourceMappingURL=pda.js.map
