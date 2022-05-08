import { __awaiter, __rest } from "tslib";
import { newProgramMap } from "@saberhq/anchor-contrib";
import {
  SolanaAugmentedProvider,
  TransactionEnvelope,
} from "@saberhq/solana-contrib";
import { Keypair, SystemProgram } from "@solana/web3.js";
import {
  DEFAULT_LOCKER_PARAMS,
  TRIBECA_ADDRESSES,
  TRIBECA_IDLS,
} from "./constants";
import { GovernWrapper } from "./wrappers";
import { findLockerAddress } from "./wrappers/lockedVoter/pda";
import { findSimpleElectorateAddress } from "./wrappers/simpleVoter/pda";
/**
 * TribecaSDK.
 */
export class TribecaSDK {
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
    const programs = newProgramMap(provider, TRIBECA_IDLS, TRIBECA_ADDRESSES);
    return new TribecaSDK(new SolanaAugmentedProvider(provider), programs);
  }
  /**
   * Govern program helpers.
   */
  get govern() {
    return new GovernWrapper(this);
  }
  createSimpleElectorate({
    proposalThreshold,
    governor,
    govTokenMint,
    baseKP = Keypair.generate(),
  }) {
    return __awaiter(this, void 0, void 0, function* () {
      const [electorate, bump] = yield findSimpleElectorateAddress(
        baseKP.publicKey
      );
      return {
        electorate,
        tx: new TransactionEnvelope(
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
  /**
   * Creates a Locker, which is an Electorate that supports vote locking.
   * @returns
   */
  createLocker(_a) {
    var { governor, govTokenMint, baseKP = Keypair.generate() } = _a,
      providedLockerParams = __rest(_a, ["governor", "govTokenMint", "baseKP"]);
    return __awaiter(this, void 0, void 0, function* () {
      const [locker, bump] = yield findLockerAddress(baseKP.publicKey);
      const lockerParams = Object.assign(
        Object.assign({}, DEFAULT_LOCKER_PARAMS),
        providedLockerParams
      );
      return {
        locker,
        tx: new TransactionEnvelope(
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
//# sourceMappingURL=sdk.js.map
