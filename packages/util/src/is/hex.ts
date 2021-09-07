// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '../types';

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
export function isHex (value: unknown, bitLength = -1, ignoreLength = false): value is HexString {
  return (typeof value === 'string' && (value === '0x' || HEX_REGEX.test(value)))
    ? bitLength === -1
      ? ((value.length % 2 === 0) || ignoreLength)
      : (value.length === (2 + Math.ceil(bitLength / 4)))
    : false;
}
