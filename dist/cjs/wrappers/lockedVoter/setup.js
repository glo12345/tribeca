"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLocker = void 0;
const tslib_1 = require("tslib");
const web3_js_1 = require("@solana/web3.js");
const constants_1 = require("../../constants");
const setup_1 = require("../govern/setup");
const locker_1 = require("./locker");
/**
 * Creates a new Locker.
 * @returns
 */
const createLocker = ({
  sdk,
  gokiSDK,
  govTokenMint,
  owners = [sdk.provider.wallet.publicKey],
  governanceParameters = constants_1.DEFAULT_GOVERNANCE_PARAMETERS,
  lockerParams = constants_1.DEFAULT_LOCKER_PARAMS,
  governorBaseKP = web3_js_1.Keypair.generate(),
  lockerBaseKP = web3_js_1.Keypair.generate(),
  smartWalletBaseKP = web3_js_1.Keypair.generate(),
}) =>
  tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const _a = yield (0, setup_1.createGovernorWithElectorate)({
        createElectorate: (governorKey) =>
          tslib_1.__awaiter(void 0, void 0, void 0, function* () {
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
      governor = tslib_1.__rest(_a, ["electorate"]);
    return Object.assign(Object.assign({}, governor), {
      lockerWrapper: new locker_1.LockerWrapper(
        sdk,
        electorate,
        governor.governorWrapper.governorKey
      ),
    });
  });
exports.createLocker = createLocker;
//# sourceMappingURL=setup.js.map
