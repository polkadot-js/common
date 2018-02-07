// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const hexToU8a = require('@polkadot/util/hex/toU8a');

const xxhashAsHex = require('./asHex');

/**
  @name xxhashAsU8a
  @signature xxhashAsU8a (data: Buffer | Uint8Array | string, bitLenght: number = 64): Uint8Array
  @summary Creates a xxhash64 u8a from the input.
  @description
    From either a `string`, `Uint8Array` or a `Buffer` input, create the xxhash64 and return the result as a `Uint8Array` with the specified `bitLength`.
  @example
    import { xxhashAsU8a } from '@polkadot/util-crypto';

    xxhashAsU8a('abc') // => 0x44bc2cf5ad770999
*/
module.exports = function xxhashAsU8a (data: Buffer | Uint8Array | string, bitLength: number = 64): Uint8Array {
  return hexToU8a(
    xxhashAsHex(data, bitLength)
  );
};
