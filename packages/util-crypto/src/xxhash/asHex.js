// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const hexAddPrefix = require('@polkadot/util/hex/addPrefix');

const xxhashAsValue = require('./asValue');

/**
  @name xxhashAsHex
  @signature xxhashAsHex (data: Buffer | Uint8Array | string, seed: number): string
  @summary Creates a xxhash hex from the input.
  @description
    From either a `string`, `Uint8Array` or a `Buffer` input, create the xxhash and return the result as a hex string.
  @example
    import { xxhashAsHex } from '@polkadot/util-crypto';

    xxhashAsHex('abcd', 0xabcd)) // => 0xe29f70f8b8c96df7
*/
module.exports = function xxhashAsHex (data: Buffer | Uint8Array | string, seed: number): string {
  return hexAddPrefix(
    xxhashAsValue(data, seed).toString(16)
  );
};
