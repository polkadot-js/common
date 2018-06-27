// Copyright 2017-2018 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import isBuffer from '../is/buffer';
import isHex from '../is/hex';
import isString from '../is/string';
import bufferToU8a from '../buffer/toU8a';
import hexToU8a from '../hex/toU8a';
import u8aFromUtf8 from './fromUtf8';

/**
 * @name u8aToU8a
 * @signature u8aToU8a (value?: Uint8Array | string): Uint8Array
 * @summary Creates a Uint8Array value from a Uint8Array bignumber or hex input.
 * @description
 * `null` inputs returns a `[]` result, Uint8Array values returns the value, hex strings returns a Uint8Array representation.
 * @example
 *   import { u8aToU8a } from '@polkadot/util';
 *
 *   u8aToU8a(new Uint8Array([0x12, 0x34]); // => Uint8Array([0x12, 0x34])
 *   u8aToU8a(0x1234); // => Uint8Array([0x12, 0x34])
 */
export default function u8aToU8a (value?: Buffer | Uint8Array | string | null): Uint8Array {
  if (!value) {
    return new Uint8Array(0);
  }

  if (isBuffer(value)) {
    return bufferToU8a(value);
  }

  if (isString(value)) {
    if (isHex(value)) {
      return hexToU8a(value);
    }

    return u8aFromUtf8(value);
  }

  return value;
}
