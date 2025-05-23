// Copyright 2017-2025 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '../types.js';

import { hexFixLength } from '../hex/fixLength.js';

/**
 * @name numberToHex
 * @summary Creates a hex value from a number.
 * @description
 * `null`/`undefined`/`NaN` inputs returns an empty `0x` result. `number` input values return the actual bytes value converted to a `hex`. With `bitLength` set, it converts the number to the equivalent size.
 * @example
 * <BR>
 *
 * ```javascript
 * import { numberToHex } from '@polkadot/util';
 *
 * numberToHex(0x1234); // => '0x1234'
 * numberToHex(0x1234, 32); // => 0x00001234
 * ```
 */
export function numberToHex (value?: number | null, bitLength = -1): HexString {
  const hex = (!value || Number.isNaN(value) ? 0 : value).toString(16);

  return hexFixLength(hex.length % 2 ? `0${hex}` : hex, bitLength, true);
}
