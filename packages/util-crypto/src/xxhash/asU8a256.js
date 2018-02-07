// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const xxhashAsU8a = require('./asU8a');

/**
  @name xxhashAsU8a256
  @signature xxhashAsU8a256 (data: Buffer | Uint8Array | string): Uint8Array
  @summary Creates a xxhash64 u8a with 256-bits from the input.
  @description
    From either a `string`, `Uint8Array` or a `Buffer` input, create the xxhash64 and return the result as a Uint8Array with 256 bits.
  @example
    import { xxhashAsU8a256 } from '@polkadot/util-crypto';

    xxhashAsU8a256('abc') // => 0x44bc2cf5ad770999
*/
module.exports = function xxhashAsU8a256 (data: Buffer | Uint8Array | string): Uint8Array {
  return xxhashAsU8a(data, 256);
};
