// Copyright 2017-2018 @polkadot/util-triehash authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

/**
  @name asNibbles
  @signature asNibbles (pairs: Trie$Pairs): Uint8Array
  @summary Converts the input to Nibbles.
  @description
    From an `Uint8Array` input, calculate and return a list of nibbles that makes up the input.
  @example
    import { asNibbles } from '@polkadot/util-triehash/util';

    asNibbles(new Uint8Array([0x41, 0x20]) // => Uint8Array([4, 1, 2, 0])
*/
module.exports = function asNibbles (bytes: Uint8Array | Array<number>): Uint8Array {
  return bytes.reduce((result, byte, index) => {
    result.set(
      [byte >> 4, byte & 0b1111],
      index * 2
    );

    return result;
  }, new Uint8Array(bytes.length * 2));
};
