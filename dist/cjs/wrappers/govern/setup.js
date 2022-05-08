"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGovernorWithElectorate = void 0;
const tslib_1 = require("tslib");
const web3_js_1 = require("@solana/web3.js");
const bn_js_1 = tslib_1.__importDefault(require("bn.js"));
const __1 = require("../..");
const __2 = require("..");
/**
 * Creates a Governor.
 * @returns
 */
const createGovernorWithElectorate = ({
  createElectorate,
  sdk,
  gokiSDK,
  owners = [sdk.provider.wallet.publicKey],
  governanceParameters = __1.DEFAULT_GOVERNANCE_PARAMETERS,
  govBaseKP = web3_js_1.Keypair.generate(),
  smartWalletBaseKP = web3_js_1.Keypair.generate(),
}) =>
  tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const [governor] = yield (0, __2.findGovernorAddress)(govBaseKP.publicKey);
    const createTXs = [];
    const { smartWalletWrapper, tx: tx1 } = yield gokiSDK.newSmartWallet({
      owners: [...owners, governor],
      threshold: new bn_js_1.default(2),
      numOwners: 3,
      base: smartWalletBaseKP,
    });
    createTXs.push({
      title: "Create Smart Wallet",
      tx: tx1,
    });
    const { key: electorate, tx: createElectorateTX } = yield createElectorate(
      governor
    );
    const { wrapper: governorWrapper, tx: tx2 } =
      yield sdk.govern.createGovernor(
        Object.assign(Object.assign({}, governanceParameters), {
          baseKP: govBaseKP,
          electorate,
          smartWallet: smartWalletWrapper.key,
        })
      );
    createTXs.push({
      title: "Create Governor",
      tx: tx2,
    });
    createTXs.push({
      title: "Create Electorate",
      tx: createElectorateTX,
    });
    return {
      governorWrapper,
      smartWalletWrapper,
      createTXs,
      electorate,
    };
  });
exports.createGovernorWithElectorate = createGovernorWithElectorate;
//# sourceMappingURL=setup.js.map
