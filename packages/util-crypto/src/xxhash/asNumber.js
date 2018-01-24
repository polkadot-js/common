// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const xxhashAsValue = require('./asValue');

/**
  @name xxhashAsNumber
  @signature xxhashAsNumber (data: Buffer | Uint8Array | string, seed: number): number
  @summary Creates a xxhash number from the input.
  @description
    From either a `string`, `Uint8Array` or a `Buffer` input, create the xxhash and return the result as a number.
  @example
    import { xxhashAsNumber } from '@polkadot/util-crypto';

    xxhashAsNumber('abcd', 0xabcd)) // => 0xcda8fae4
*/
module.exports = function xxhashAsNumber (data: Buffer | Uint8Array | string, seed: number): string {
  return xxhashAsValue(data, seed).toNumber();
};
