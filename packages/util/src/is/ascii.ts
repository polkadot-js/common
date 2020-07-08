// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import u8aToU8a from '../u8a/toU8a';
import isString from './string';

const FORMAT = [9, 10, 13];

/**
 * @name isAscii
 * @summary Tests if the input is printable ASCII
 * @description
 * Checks to see if the input string or Uint8Array is printable ASCII, 32-127 + formatters
 */
export default function isAscii (value?: number[] | Buffer | Uint8Array | string | null): boolean {
  if (!value) {
    return isString(value);
  }

  const u8a = u8aToU8a(value);

  return !u8a.some((byte) => (byte >= 127) || (byte < 32 && !FORMAT.includes(byte)));
}
