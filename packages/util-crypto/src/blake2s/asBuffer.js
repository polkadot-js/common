// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const u8aToBuffer = require('@polkadot/util/u8a/toBuffer');
const blake2sAsU8a = require('./asU8a');

module.exports = function blake2sAsBuffer (data: Uint8Array): Buffer {
  return u8aToBuffer(
    blake2sAsU8a(data)
  );
};
