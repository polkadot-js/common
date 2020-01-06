// Copyright 2017-2020 @polkadot/trie-codec authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

/**
 * @name toNibbles
 * @summary Converts the input to Nibbles.
 * @description
 * From an `Uint8Array` input, calculate and return a list of nibbles that makes up the input.
 * @example
 * <BR>
 *
 * ```javascript
 * import { toNibbles } from '@polkadot/trie-codec/util';
 *
 * toNibbles(new Uint8Array([0x41, 0x20]); // => Uint8Array([4, 1, 2, 0])
 * ```
 */
export default function toNibbles (input?: Uint8Array | null): Uint8Array {
  if (!input) {
    return new Uint8Array();
  }

  const result = new Uint8Array(input.length * 2);

  for (let index = 0; index < input.length; index++) {
    const nibIndex = index << 1;
    const byte = input[index];

    result[nibIndex] = byte >> 4;
    result[nibIndex + 1] = byte & 0b1111;
  }

  return result;
}
