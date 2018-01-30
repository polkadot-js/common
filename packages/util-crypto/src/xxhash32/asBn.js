// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const BN = require('bn.js');

const xxhash32AsValue = require('./asValue');

/**
  @name xxhash32AsBn
  @signature xxhash32AsBn (data: Buffer | Uint8Array | string, seed: number): BN
  @summary Creates a xxhash BN from the input.
  @description
    From either a `string`, `Uint8Array` or a `Buffer` input, create the xxhash and return the result as a BN.
  @example
    import { xxhash32AsNumber } from '@polkadot/util-crypto';

    xxhash32AsBn('abcd', 0xabcd)) // => new BN(0xcda8fae4)
*/
module.exports = function xxhash32AsBn (data: Buffer | Uint8Array | string, seed: number): BN {
  return new BN(
    xxhash32AsValue(data, seed).toString(16),
    16
  );
};
