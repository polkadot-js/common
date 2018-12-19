// Copyright 2017-2018 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import BN from 'bn.js';

import isBoolean from '../is/boolean';
import hexStripPrefix from './stripPrefix';
import { ToBnOptions } from '../types';

function reverse (value: string): string {
  return (value.match(new RegExp('.{1,2}', 'g')) || [])
    .reverse()
    .join('');
}

/**
 * @name hexToBn
 * @signature hexToBn (value?: string, _options: ToBnOptions | boolean = { isLe: false, isNegative: false }): BN
 * @summary Creates a BN.js bignumber object from a hex string.
 * @description
 * `null` inputs returns a `BN(0)` result. Hex input values return the actual value converted to a BN. Anything that is not a hex string (including the `0x` prefix) throws an error.
 * @example
 * <BR>
 *
 * ```javascript
 * import { hexToBn } from '@polkadot/util';
 *
 * hexToBn('0x123480001f'); // => BN(0x123480001f)
 * ```
 */
export default function hexToBn (
  _value?: string | number | null,
  _options: ToBnOptions | boolean = { isLe: false, isNegative: false }
): BN {
  if (!_value) {
    return new BN(0);
  }

  const options: ToBnOptions = isBoolean(_options)
    ? { isLe: _options, isNegative: false }
    : _options;

  const value = hexStripPrefix(_value as string);

  // FIXME: Use BN's 3rd argument `isLe` once this issue is fixed
  // https://github.com/indutny/bn.js/issues/208
  const bn = new BN((options.isLe ? reverse(value) : value) || '00', 16);

  return options.isNegative ? bn.fromTwos(8) : bn;
}
