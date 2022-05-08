import { __awaiter, __rest } from "tslib";
import { Keypair } from "@solana/web3.js";
import {
  DEFAULT_GOVERNANCE_PARAMETERS,
  DEFAULT_LOCKER_PARAMS,
} from "../../constants";
import { createGovernorWithElectorate } from "../govern/setup";
import { LockerWrapper } from "./locker";
/**
 * Creates a new Locker.
 * @returns
 */
export const createLocker = ({
  sdk,
  gokiSDK,
  govTokenMint,
  owners = [sdk.provider.wallet.publicKey],
  governanceParameters = DEFAULT_GOVERNANCE_PARAMETERS,
  lockerParams = DEFAULT_LOCKER_PARAMS,
  governorBaseKP = Keypair.generate(),
  lockerBaseKP = Keypair.generate(),
  smartWalletBaseKP = Keypair.generate(),
}) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const _a = yield createGovernorWithElectorate({
        createElectorate: (governorKey) =>
          __awaiter(void 0, void 0, void 0, function* () {
            const { locker, tx: tx1 } = yield sdk.createLocker(
              Object.assign(Object.assign({}, lockerParams), {
                baseKP: lockerBaseKP,
                governor: governorKey,
                govTokenMint,
              })
            );
            return {
              key: locker,
              tx: tx1,
            };
          }),
        sdk,
        gokiSDK,
        owners,
        governanceParameters,
        govBaseKP: governorBaseKP,
        smartWalletBaseKP,
      }),
      { electorate } = _a,
      governor = __rest(_a, ["electorate"]);
    return Object.assign(Object.assign({}, governor), {
      lockerWrapper: new LockerWrapper(
        sdk,
        electorate,
        governor.governorWrapper.governorKey
      ),
    });
  });
//# sourceMappingURL=setup.js.map
