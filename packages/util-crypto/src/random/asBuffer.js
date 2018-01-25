// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const u8aToBuffer = require('@polkadot/util/u8a/toBuffer');

const randomAsU8a = require('./asU8a');

/**
  @name randomAsBuffer
  @signature randomAsBuffer (length?: number = 32): Buffer
  @summary Creates a Buffer filled with random bytes.
  @description
    Returns a `Buffer` with the specified (optional) length filled with random bytes.
  @example
    import { randomAsBuffer } from '@polkadot/util-crypto';

    randomAsBuffer() // => Buffer([...])
*/
module.exports = function randomAsBuffer (length?: number = 32): Buffer {
  return u8aToBuffer(
    randomAsU8a(length)
  );
};
