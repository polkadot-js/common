// Copyright 2017-2018 @polkadot/trie-hash authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

/**
 * @name fromNibbles
 * @signature fromNibbles (nibbles: Uint8Array): Uint8Array
 * @summary Converts the input to Nibbles.
 * @description
 * From an `Uint8Array` input, calculate and return a list of nibbles that makes up the input.
 * @example
 *   import { fromNibbles } from '@polkadot/trie-hash/util';
 *
 *   asNibbles(new Uint8Array([4, 1, 2, 0])) // => Uint8Array([0x41, 0x20]
 */
export default function fromNibbles (nibbles: Uint8Array | Array<number>): Uint8Array {
  const u8a = new Uint8Array(nibbles.length / 2);

  for (let index = 0; index < u8a.length; index++) {
    const nibIndex = index * 2;

    u8a[index] = (nibbles[nibIndex] << 4) + nibbles[nibIndex + 1];
  }

  return u8a;
}
