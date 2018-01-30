// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const xxhash32AsValue = require('./asValue');

/**
  @name xxhash32AsRaw
  @signature xxhash32AsRaw (data: Buffer | Uint8Array | string, seed: number): string
  @summary Creates a xxhash non-prefixed hex from the input.
  @description
    From either a `string`, `Uint8Array` or a `Buffer` input, create the xxhash and return the result as a non-prefixed hex string.
  @example
    import { xxhash32AsRaw } from '@polkadot/util-crypto';

    xxhash32AsRaw('abcd', 0xabcd)) // => cda8fae4
*/
module.exports = function xxhash32AsRaw (data: Buffer | Uint8Array | string, seed: number): string {
  return xxhash32AsValue(data, seed).toString(16);
};
