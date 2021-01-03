// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ToBnOptions } from '../types';

import BN from 'bn.js';

import { isBoolean } from '../is/boolean';
import { hexStripPrefix } from './stripPrefix';

function reverse (value: string): string {
  return (value.match(/.{1,2}/g) || [])
    .reverse()
    .join('');
}

/**
 * @name hexToBn
 * @summary Creates a BN.js bignumber object from a hex string.
 * @description
 * `null` inputs returns a `BN(0)` result. Hex input values return the actual value converted to a BN. Anything that is not a hex string (including the `0x` prefix) throws an error.
 * @param _value The value to convert
 * @param _options Options to pass while converting
 * @param _options.isLe Convert using Little Endian
 * @param _options.isNegative Convert using two's complement
 * @example
 * <BR>
 *
 * ```javascript
 * import { hexToBn } from '@polkadot/util';
 *
 * hexToBn('0x123480001f'); // => BN(0x123480001f)
 * ```
 */
export function hexToBn (value?: string | number | null, options: ToBnOptions | boolean = { isLe: false, isNegative: false }): BN {
  if (!value) {
    return new BN(0);
  }

  const _options: ToBnOptions = {
    isLe: false,
    isNegative: false,
    // Backwards-compatibility
    ...(isBoolean(options) ? { isLe: options } : options)
  };

  const _value = hexStripPrefix(value as string);

  // FIXME: Use BN's 3rd argument `isLe` once this issue is fixed
  // https://github.com/indutny/bn.js/issues/208
  const bn = new BN((_options.isLe ? reverse(_value) : _value) || '00', 16);

  // fromTwos takes as parameter the number of bits, which is the hex length
  // multiplied by 4.
  return _options.isNegative ? bn.fromTwos(_value.length * 4) : bn;
}
