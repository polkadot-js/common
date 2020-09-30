// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import '../polyfill';

/**
 * @summary Create valid mnemonic strings, validate them using BIP39, and convert them to valid seeds
 */
export { default as mnemonicGenerate } from './generate';
export { default as mnemonicToEntropy } from './toEntropy';
export { default as mnemonicToLegacySeed } from './toLegacySeed';
export { default as mnemonicToMiniSecret } from './toMiniSecret';
export { default as mnemonicValidate } from './validate';
