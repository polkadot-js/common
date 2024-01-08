// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { U8aLike } from '../types.js';

import { u8aToU8a } from './toU8a.js';

/**
 * @name u8aConcat
 * @summary Creates a concatenated Uint8Array from the inputs.
 * @description
 * Concatenates the input arrays into a single `UInt8Array`.
 * @example
 * <BR>
 *
 * ```javascript
 * import { { u8aConcat } from '@polkadot/util';
 *
 * u8aConcat(
 *   new Uint8Array([1, 2, 3]),
 *   new Uint8Array([4, 5, 6])
 * ); // [1, 2, 3, 4, 5, 6]
 * ```
 */
export function u8aConcat (...list: readonly U8aLike[]): Uint8Array {
  const count = list.length;
  const u8as = new Array<Uint8Array>(count);

  for (let i = 0; i < count; i++) {
    u8as[i] = u8aToU8a(list[i]);
  }

  return Uint8Array.from(Buffer.concat(u8as));
}
