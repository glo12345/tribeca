"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GovernWrapper = void 0;
const tslib_1 = require("tslib");
const solana_contrib_1 = require("@saberhq/solana-contrib");
const web3_js_1 = require("@solana/web3.js");
const __1 = require("../..");
const governor_1 = require("./governor");
const pda_1 = require("./pda");
class GovernWrapper {
  constructor(sdk) {
    this.sdk = sdk;
    this.program = sdk.programs.Govern;
  }
  get provider() {
    return this.sdk.provider;
  }
  fetchVote(key) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      return yield this.program.account.vote.fetch(key);
    });
  }
  createGovernor(_a) {
    var { electorate, smartWallet, baseKP = web3_js_1.Keypair.generate() } = _a,
      governorParams = tslib_1.__rest(_a, [
        "electorate",
        "smartWallet",
        "baseKP",
      ]);
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      const [governor, bump] = yield (0, pda_1.findGovernorAddress)(
        baseKP.publicKey
      );
      const wrapper = new governor_1.GovernorWrapper(this.sdk, governor);
      return {
        wrapper,
        tx: new solana_contrib_1.TransactionEnvelope(
          this.provider,
          [
            this.sdk.programs.Govern.instruction.createGovernor(
              bump,
              electorate,
              Object.assign(
                Object.assign({}, __1.DEFAULT_GOVERNANCE_PARAMETERS),
                governorParams
              ),
              {
                accounts: {
                  base: baseKP.publicKey,
                  governor,
                  smartWallet,
                  payer: this.provider.wallet.publicKey,
                  systemProgram: web3_js_1.SystemProgram.programId,
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
exports.GovernWrapper = GovernWrapper;
//# sourceMappingURL=govern.js.map
