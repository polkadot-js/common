// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const hexAddPrefix = require('@polkadot/util/hex/addPrefix');

const xxhash32AsRaw = require('./asRaw');

/**
  @name xxhash32AsHex
  @signature xxhash32AsHex (data: Buffer | Uint8Array | string, seed: number): string
  @summary Creates a xxhash hex from the input.
  @description
    From either a `string`, `Uint8Array` or a `Buffer` input, create the xxhash and return the result as a hex string.
  @example
    import { xxhash32AsHex } from '@polkadot/util-crypto';

    xxhash32AsHex('abcd', 0xabcd)) // => 0xcda8fae4
*/
module.exports = function xxhash32AsHex (data: Buffer | Uint8Array | string, seed: number): string {
  return hexAddPrefix(
    xxhash32AsRaw(data, seed)
  );
};
