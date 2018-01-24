// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const bufferToHex = require('@polkadot/util/buffer/toHex');
const blake2sAsBuffer = require('./asBuffer');

module.exports = function blake2sAsHex (data: Uint8Array): string {
  return bufferToHex(
    blake2sAsBuffer(data)
  );
};
