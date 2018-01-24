// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const u8aToBuffer = require('@polkadot/util/u8a/toBuffer');
const blake2sAsU8a = require('./asU8a');

/**
  @name blake2sAsBuffer
  @signature blake2sAsBuffer (value: Uint8Array): Buffer
  @summary Creates a blake2s Buffer from the input.
  @description
    From a `Uint8Array` input, create the blake2s and return the result as a `Buffer`.
  @example
    import { blake2sAsBuffer } from '@polkadot/util-crypto';

    blake2sAsBuffer('abc') // => Buffer.from('508c5e8c327c14e2e1a72ba34eeb452f37458b209ed63a294d999b4c86675982', 'hex')
*/
module.exports = function blake2sAsBuffer (data: Uint8Array): Buffer {
  return u8aToBuffer(
    blake2sAsU8a(data)
  );
};
