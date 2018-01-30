// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const xxhashAsHex = require('./asHex');

/**
  @name xxhashAsHex256
  @signature xxhashAsHex256 (data: Buffer | Uint8Array | string): string
  @summary Creates a xxhash64 hex with 256-bits from the input.
  @description
    From either a `string`, `Uint8Array` or a `Buffer` input, create the xxhash64 and return the result as a hex string with 256 bits.
  @example
    import { xxhashAsHex256 } from '@polkadot/util-crypto';

    xxhashAsHex256('abc')) // => 0x44bc2cf5ad770999bea9ca8199328908
*/
module.exports = function xxhashAsHex256 (data: Buffer | Uint8Array | string): string {
  return xxhashAsHex(data, 256);
};
