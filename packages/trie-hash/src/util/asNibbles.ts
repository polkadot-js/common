// Copyright 2017-2018 @polkadot/trie-hash authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

/**
  @name asNibbles
  @signature asNibbles (pairs: Trie$Pairs): Uint8Array
  @summary Converts the input to Nibbles.
  @description
    From an `Uint8Array` input, calculate and return a list of nibbles that makes up the input.
  @example
    import { asNibbles } from '@polkadot/trie-hash/util';

    asNibbles(new Uint8Array([0x41, 0x20]) // => Uint8Array([4, 1, 2, 0])
*/
export default function asNibbles (bytes: Uint8Array | Array<number>): Uint8Array {
  // HACK TypeScript gets a little bit confused as to what to apply, hence casting here although the reduces function for both types does exactly the same
  return (bytes as number[]).reduce((result, byte, index) => {
    result.set(
      [byte >> 4, byte & 0b1111],
      index * 2
    );

    return result;
  }, new Uint8Array(bytes.length * 2));
}
