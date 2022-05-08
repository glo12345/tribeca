import { __awaiter, __rest } from "tslib";
import { TransactionEnvelope } from "@saberhq/solana-contrib";
import { Keypair, SystemProgram } from "@solana/web3.js";
import { DEFAULT_GOVERNANCE_PARAMETERS } from "../..";
import { GovernorWrapper } from "./governor";
import { findGovernorAddress } from "./pda";
export class GovernWrapper {
  constructor(sdk) {
    this.sdk = sdk;
    this.program = sdk.programs.Govern;
  }
  get provider() {
    return this.sdk.provider;
  }
  fetchVote(key) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield this.program.account.vote.fetch(key);
    });
  }
  createGovernor(_a) {
    var { electorate, smartWallet, baseKP = Keypair.generate() } = _a,
      governorParams = __rest(_a, ["electorate", "smartWallet", "baseKP"]);
    return __awaiter(this, void 0, void 0, function* () {
      const [governor, bump] = yield findGovernorAddress(baseKP.publicKey);
      const wrapper = new GovernorWrapper(this.sdk, governor);
      return {
        wrapper,
        tx: new TransactionEnvelope(
          this.provider,
          [
            this.sdk.programs.Govern.instruction.createGovernor(
              bump,
              electorate,
              Object.assign(
                Object.assign({}, DEFAULT_GOVERNANCE_PARAMETERS),
                governorParams
              ),
              {
                accounts: {
                  base: baseKP.publicKey,
                  governor,
                  smartWallet,
                  payer: this.provider.wallet.publicKey,
                  systemProgram: SystemProgram.programId,
                },
              }
            ),
          ],
          [baseKP]
        ),
      };
    });
  }
}
//# sourceMappingURL=govern.js.map
