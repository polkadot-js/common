// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const bufferToHex = require('@polkadot/util/buffer/toHex');
const blake2sAsBuffer = require('./asBuffer');

/**
  @name blake2sAsHex
  @signature blake2sAsHex (value: Uint8Array): string
  @summary Creates a blake2s hex string from the input.
  @description
    From a `Uint8Array` input, create the blake2s and return the result as a hex string.
  @example
    import { blake2sAsHex } from '@polkadot/util-crypto';

    blake2sAsHex('abc') // => '0x508c5e8c327c14e2e1a72ba34eeb452f37458b209ed63a294d999b4c86675982'
*/
module.exports = function blake2sAsHex (data: Uint8Array): string {
  return bufferToHex(
    blake2sAsBuffer(data)
  );
};
