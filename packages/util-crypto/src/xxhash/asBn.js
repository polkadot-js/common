// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const BN = require('bn.js');

const xxhashAsValue = require('./asValue');

/**
  @name xxhashAsBn
  @signature xxhashAsBn (data: Buffer | Uint8Array | string, seed: number): BN
  @summary Creates a xxhash BN from the input.
  @description
    From either a `string`, `Uint8Array` or a `Buffer` input, create the xxhash and return the result as a BN.
  @example
    import { xxhashAsNumber } from '@polkadot/util-crypto';

    xxhashAsBn('abcd', 0xabcd)) // => new BN(0xe29f70f8b8c96df7)
*/
module.exports = function xxhashAsBn (data: Buffer | Uint8Array | string, seed: number): BN {
  return new BN(
    xxhashAsValue(data, seed).toString(16),
    16
  );
};
