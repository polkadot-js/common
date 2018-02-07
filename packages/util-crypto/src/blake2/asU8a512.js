// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const blake2AsU8a = require('./asU8a');

/**
  @name blake2AsU8a512
  @signature blake2AsU8a512 (data: Uint8Array): Uint8Array
  @summary Creates a blake2b u8a with 512-bits from the input.
  @description
    From a `Uint8Array` input, create the blake2b and return the result as a Uint8Array with 512 bits.
  @example
    import { blake2AsU8a512 } from '@polkadot/util-crypto';

    blake2AsU8a512('abc') // => 0x44bc2cf5ad770999
*/
module.exports = function blake2AsU8a512 (data: Uint8Array): Uint8Array {
  return blake2AsU8a(data, 512);
};
