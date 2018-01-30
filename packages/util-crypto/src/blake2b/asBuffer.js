// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const u8aToBuffer = require('@polkadot/util/u8a/toBuffer');
const blake2bAsU8a = require('./asU8a');

/**
  @name blake2bAsBuffer
  @signature blake2bAsBuffer (value: Uint8Array): Buffer
  @summary Creates a blake2b Buffer from the input.
  @description
    From a `Uint8Array` input, create the blake2b and return the result as a `Buffer`.
  @example
    import { blake2bAsBuffer } from '@polkadot/util-crypto';

    blake2bAsBuffer('abc') // => Buffer.from('ba80a53f981c4d0d6a2797b69f12f6e94c212f14685ac4b74b12bb6fdbffa2d17d87c5392aab792dc252d5de4533cc9518d38aa8dbf1925ab92386edd4009923', 'hex')
*/
module.exports = function blake2bAsBuffer (data: Uint8Array): Buffer {
  return u8aToBuffer(
    blake2bAsU8a(data)
  );
};
