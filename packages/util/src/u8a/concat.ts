// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import u8aToU8a from './toU8a';

/**
 * @name u8aConcat
 * @summary Creates a concatenated Uint8Array from the inputs.
 * @description
 * Concatenates the input arrays into a single `UInt8Array`.
 * @example
 * <BR>
 *
 * ```javascript
 * import { u8aConcat } from '@polkadot/util';
 *
 * u8aConcat(
 *   new Uint8Array([1, 2, 3]),
 *   new Uint8Array([4, 5, 6])
 * ); // [1, 2, 3, 4, 5, 6]
 * ```
 */
export default function u8aConcat (...list: (Uint8Array | string)[]): Uint8Array {
  let length = 0;
  let offset = 0;
  const u8as = new Array(list.length) as Uint8Array[];

  for (let i = 0; i < list.length; i++) {
    u8as[i] = u8aToU8a(list[i]);

    length += u8as[i].length;
  }

  const result = new Uint8Array(length);

  for (let i = 0; i < u8as.length; i++) {
    result.set(u8as[i], offset);
    offset += u8as[i].length;
  }

  return result;
}
