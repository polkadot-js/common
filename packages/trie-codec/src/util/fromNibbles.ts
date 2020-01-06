// Copyright 2017-2020 @polkadot/trie-codec authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

/**
 * @name fromNibbles
 * @summary Converts the input to Nibbles.
 * @description
 * From an `Uint8Array` input, calculate and return a list of nibbles that makes up the input.
 * @example
 * <BR>
 *
 * ```javascript
 * import { fromNibbles } from '@polkadot/trie-codec/util';
 *
 * fromNibbles(new Uint8Array([4, 1, 2, 0])); // => Uint8Array([0x41, 0x20]
 * ```
 */
export default function fromNibbles (input: Uint8Array): Uint8Array {
  const u8a = new Uint8Array(input.length / 2);

  for (let index = 0; index < u8a.length; index++) {
    const nibIndex = index << 1;

    u8a[index] = (input[nibIndex] << 4) + input[nibIndex + 1];
  }

  return u8a;
}
