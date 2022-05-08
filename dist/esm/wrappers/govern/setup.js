import { __awaiter } from "tslib";
import { Keypair } from "@solana/web3.js";
import BN from "bn.js";
import { DEFAULT_GOVERNANCE_PARAMETERS } from "../..";
import { findGovernorAddress } from "..";
/**
 * Creates a Governor.
 * @returns
 */
export const createGovernorWithElectorate = ({
  createElectorate,
  sdk,
  gokiSDK,
  owners = [sdk.provider.wallet.publicKey],
  governanceParameters = DEFAULT_GOVERNANCE_PARAMETERS,
  govBaseKP = Keypair.generate(),
  smartWalletBaseKP = Keypair.generate(),
}) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const [governor] = yield findGovernorAddress(govBaseKP.publicKey);
    const createTXs = [];
    const { smartWalletWrapper, tx: tx1 } = yield gokiSDK.newSmartWallet({
      owners: [...owners, governor],
      threshold: new BN(2),
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
//# sourceMappingURL=setup.js.map
