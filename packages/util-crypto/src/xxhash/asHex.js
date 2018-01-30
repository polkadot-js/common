// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const hexAddPrefix = require('@polkadot/util/hex/addPrefix');

const xxhash64AsRaw = require('../xxhash64/asRaw');

/**
  @name xxhashAsHex
  @signature xxhashAsHex (data: Buffer | Uint8Array | string, bitLenght: number = 64): string
  @summary Creates a xxhash64 hex from the input.
  @description
    From either a `string`, `Uint8Array` or a `Buffer` input, create the xxhash64 and return the result as a hex string with the specified `bitLength`.
  @example
    import { xxhashAsHex } from '@polkadot/util-crypto';

    xxhashAsHex('abc')) // => 0x44bc2cf5
*/
module.exports = function xxhashAsHex (data: Buffer | Uint8Array | string, bitLength: number = 64): string {
  const byteLength = Math.ceil(bitLength / 8);
  const iterations = Math.ceil(byteLength / 8);
  let result = xxhash64AsRaw(data, 0);

  for (let seed = 1; seed < iterations; seed++) {
    result += xxhash64AsRaw(data, seed);
  }

  return hexAddPrefix(
    result.substr(0, byteLength)
  );
};
