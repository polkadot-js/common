// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const blake2AsHex = require('./asHex');

/**
  @name blake2AsHex512
  @signature blake2AsHex512 (data: Uint8Array): string
  @summary Creates a blake2b hex with 512-bits from the input.
  @description
    From a `Uint8Array` input, create the blake2b and return the result as a hex string with 512 bits.
  @example
    import { blake2AsHex512 } from '@polkadot/util-crypto';

    blake2AsHex512('abc') // => 0x44bc2cf5ad770999
*/
module.exports = function blake2AsHex512 (data: Uint8Array): string {
  return blake2AsHex(data, 512);
};
