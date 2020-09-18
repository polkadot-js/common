// Copyright 2017-2020 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import isString from './string';

const HEX_REGEX = /^0x[a-fA-F0-9]+$/;

/**
 * @name isHex
 * @summary Tests for a hex string.
 * @description
 * Checks to see if the input value is a `0x` prefixed hex string. Optionally (`bitLength` !== -1) checks to see if the bitLength is correct.
 * @example
 * <BR>
 *
 * ```javascript
 * import { isHex } from '@polkadot/util';
 *
 * isHex('0x1234'); // => true
 * isHex('0x1234', 8); // => false
 * ```
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export default function isHex (value: unknown, bitLength = -1, ignoreLength = false): value is string | String {
  const isValidHex = value === '0x' || (isString(value) && HEX_REGEX.test(value.toString()));

  if (isValidHex && bitLength !== -1) {
    return (value as string).length === (2 + Math.ceil(bitLength / 4));
  }

  return isValidHex && (ignoreLength || ((value as string).length % 2 === 0));
}
