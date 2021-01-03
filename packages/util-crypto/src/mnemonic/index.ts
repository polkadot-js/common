// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @summary Create valid mnemonic strings, validate them using BIP39, and convert them to valid seeds
 */
export { mnemonicGenerate } from './generate';
export { mnemonicToEntropy } from './toEntropy';
export { mnemonicToLegacySeed } from './toLegacySeed';
export { mnemonicToMiniSecret } from './toMiniSecret';
export { mnemonicValidate } from './validate';
