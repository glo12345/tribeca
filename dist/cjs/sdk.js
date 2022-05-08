"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TribecaSDK = void 0;
const tslib_1 = require("tslib");
const anchor_contrib_1 = require("@saberhq/anchor-contrib");
const solana_contrib_1 = require("@saberhq/solana-contrib");
const web3_js_1 = require("@solana/web3.js");
const constants_1 = require("./constants");
const wrappers_1 = require("./wrappers");
const pda_1 = require("./wrappers/lockedVoter/pda");
const pda_2 = require("./wrappers/simpleVoter/pda");
/**
 * TribecaSDK.
 */
class TribecaSDK {
  constructor(provider, programs) {
    this.provider = provider;
    this.programs = programs;
  }
  /**
   * Creates a new instance of the SDK with the given keypair.
   */
  withSigner(signer) {
    return TribecaSDK.load({
      provider: this.provider.withSigner(signer),
    });
  }
  /**
   * Loads the SDK.
   * @returns
   */
  static load({ provider }) {
    const programs = (0, anchor_contrib_1.newProgramMap)(
      provider,
      constants_1.TRIBECA_IDLS,
      constants_1.TRIBECA_ADDRESSES
    );
    return new TribecaSDK(
      new solana_contrib_1.SolanaAugmentedProvider(provider),
      programs
    );
  }
  /**
   * Govern program helpers.
   */
  get govern() {
    return new wrappers_1.GovernWrapper(this);
  }
  createSimpleElectorate({
    proposalThreshold,
    governor,
    govTokenMint,
    baseKP = web3_js_1.Keypair.generate(),
  }) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      const [electorate, bump] = yield (0, pda_2.findSimpleElectorateAddress)(
        baseKP.publicKey
      );
      return {
        electorate,
        tx: new solana_contrib_1.TransactionEnvelope(
          this.provider,
          [
            this.programs.SimpleVoter.instruction.initializeElectorate(
              bump,
              proposalThreshold,
              {
                accounts: {
                  base: baseKP.publicKey,
                  governor,
                  electorate,
                  govTokenMint,
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
  /**
   * Creates a Locker, which is an Electorate that supports vote locking.
   * @returns
   */
  createLocker(_a) {
    var { governor, govTokenMint, baseKP = web3_js_1.Keypair.generate() } = _a,
      providedLockerParams = tslib_1.__rest(_a, [
        "governor",
        "govTokenMint",
        "baseKP",
      ]);
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      const [locker, bump] = yield (0, pda_1.findLockerAddress)(
        baseKP.publicKey
      );
      const lockerParams = Object.assign(
        Object.assign({}, constants_1.DEFAULT_LOCKER_PARAMS),
        providedLockerParams
      );
      return {
        locker,
        tx: new solana_contrib_1.TransactionEnvelope(
          this.provider,
          [
            this.programs.LockedVoter.instruction.newLocker(
              bump,
              lockerParams,
              {
                accounts: {
                  base: baseKP.publicKey,
                  governor,
                  locker,
                  tokenMint: govTokenMint,
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
exports.TribecaSDK = TribecaSDK;
//# sourceMappingURL=sdk.js.map
