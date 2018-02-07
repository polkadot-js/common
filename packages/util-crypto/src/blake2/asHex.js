// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const hexAddPrefix = require('@polkadot/util/hex/addPrefix');

const blake2bAsBuffer = require('../blake2b/asBuffer');

/**
  @name blake2AsHex
  @signature blake2AsHex (data: Uint8Array, bitLenght: number = 64): string
  @summary Creates a blake2b hex from the input.
  @description
    From a `Uint8Array` input, create the blake2b and return the result as a hex string with the specified `bitLength`.
  @example
    import { blake2AsHex } from '@polkadot/util-crypto';

    blake2AsHex('abc') // => 0xba80a53f981c4d0d
*/
module.exports = function blake2AsHex (data: Uint8Array, bitLength: number = 64): string {
  return hexAddPrefix(
    blake2bAsBuffer(data)
      .slice(0, Math.ceil(bitLength / 8))
      .toString('hex')
  );
};
