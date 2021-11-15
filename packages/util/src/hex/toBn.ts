// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ToBnOptions } from '../types';

import { BN } from '../bn/bn';
import { isBoolean } from '../is/boolean';
import { objectSpread } from '../object/spread';
import { hexStripPrefix } from './stripPrefix';

const DEFAULT_OPTS: ToBnOptions = { isLe: false, isNegative: false };

/**
 * @name hexToBn
 * @summary Creates a BN.js object from a hex string.
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
export function hexToBn (value?: string | null, options: ToBnOptions | boolean = DEFAULT_OPTS): BN {
  if (!value || value === '0x') {
    return new BN(0);
  }

  const { isLe, isNegative }: ToBnOptions = objectSpread(
    { isLe: false, isNegative: false },
    isBoolean(options)
      ? { isLe: options }
      : options
  );
  const stripped = hexStripPrefix(value);
  const bn = new BN(stripped, 16, isLe ? 'le' : 'be');

  // fromTwos takes as parameter the number of bits, which is the hex length
  // multiplied by 4.
  return isNegative
    ? bn.fromTwos(stripped.length * 4)
    : bn;
}
