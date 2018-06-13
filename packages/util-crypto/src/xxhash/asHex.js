// Copyright 2017-2018 @polkadot/util-crypto authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const u8aToHex = require('@polkadot/util/u8a/toHex');

const xxhashAsU8a = require('./asU8a');

/**
  @name xxhashAsHex
  @signature xxhashAsHex (data: Buffer | Uint8Array | string, bitLenght: number = 64): string
  @summary Creates a xxhash64 hex from the input.
  @description
    From either a `string`, `Uint8Array` or a `Buffer` input, create the xxhash64 and return the result as a hex string with the specified `bitLength`.
  @example
    import { xxhashAsHex } from '@polkadot/util-crypto';

    xxhashAsHex('abc') // => 0x44bc2cf5ad770999
*/
module.exports = function xxhashAsHex (data: Buffer | Uint8Array | string, bitLength: number = 64): string {
  return u8aToHex(
    xxhashAsU8a(data, bitLength)
  );
};
