// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const blake2bAsU8a = require('../blake2b/asU8a');

/**
  @name blake2AsU8a
  @signature blake2AsU8a (data: Uint8Array, bitLenght: number = 64): Uint8Array
  @summary Creates a blake2b u8a from the input.
  @description
    From a `Uint8Array` input, create the blake2b and return the result as a u8a with the specified `bitLength`.
  @example
    import { blake2AsU8a } from '@polkadot/util-crypto';

    blake2AsU8a('abc')) // => [0xba, 0x80, 0xa53, 0xf98, 0x1c, 0x4d, 0x0d]
*/
module.exports = function blake2AsU8a (data: Uint8Array, bitLength: number = 64): Uint8Array {
  return blake2bAsU8a(data).slice(0, Math.ceil(bitLength / 8));
};
