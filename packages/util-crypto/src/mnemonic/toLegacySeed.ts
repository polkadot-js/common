// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { assert } from "@polkadot/util";
import { bip39ToSeed, isReady } from "@polkadot/wasm-crypto";

import { mnemonicToSeedSync } from "./bip39";
import { mnemonicValidate } from "./validate";

/**
 * @name toSeed
 * @summary Creates a valid Ethereum/Bitcoin-compatible seed from a mnemonic input
 * @example
 * <BR>
 *
 * ```javascript
 * import { mnemonicGenerate, mnemonicToBip39, mnemonicValidate } from '@polkadot/util-crypto';
 *
 * const mnemonic = mnemonicGenerate(); // => string
 * const isValidMnemonic = mnemonicValidate(mnemonic); // => boolean
 *
 * if (isValidMnemonic) {
 *   console.log(`Seed generated from mnemonic: ${mnemonicToBip39(mnemonic)}`); => u8a
 * }
 * ```
 */
export function mnemonicToLegacySeed(mnemonic: string, password = "", onlyJs = false, isEthereum: boolean): Uint8Array {
  // IS THIS USED BY ANY OTHER BC THAN ETHEREUM? WE COULD SIMPLIFY THIS FUNCTION IF IT ISNT THE CASE
  assert(mnemonicValidate(mnemonic), "Invalid bip39 mnemonic specified");
  console.log("isReady() && !onlyJs", isReady() && !onlyJs);
  console.log("bip39ToSeed(mnemonic, password)", bip39ToSeed(mnemonic, password));
  console.log("mnemonicToSeedSync(mnemonic, password)", mnemonicToSeedSync(mnemonic, password));
  if (isEthereum) {
    return mnemonicToSeedSync(mnemonic, password);
  } else {
    return isReady() && !onlyJs
      ? bip39ToSeed(mnemonic, password)
      : mnemonicToSeedSync(mnemonic, password).subarray(0, 32);
  }
}
