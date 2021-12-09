// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { U8aLike } from '../types';

import { hexToU8a } from '../hex/toU8a';
import { isBuffer } from '../is/buffer';
import { isHex } from '../is/hex';
import { isU8a } from '../is/u8a';
import { stringToU8a } from '../string/toU8a';

/**
 * @name u8aToU8a
 * @summary Creates a Uint8Array value from a Uint8Array, Buffer, string or hex input.
 * @description
 * `null` or `undefined` inputs returns a `[]` result, Uint8Array values returns the value, hex strings returns a Uint8Array representation.
 * @example
 * <BR>
 *
 * ```javascript
 * import { u8aToU8a } from '@polkadot/util';
 *
 * u8aToU8a(new Uint8Array([0x12, 0x34]); // => Uint8Array([0x12, 0x34])
 * u8aToU8a(0x1234); // => Uint8Array([0x12, 0x34])
 * ```
 */
export function u8aToU8a (value?: U8aLike | null): Uint8Array {
  return !value
    ? new Uint8Array()
    : Array.isArray(value) || isBuffer(value)
      ? new Uint8Array(value)
      : isU8a(value)
        ? value
        : isHex(value)
          ? hexToU8a(value)
          : stringToU8a(value);
}
