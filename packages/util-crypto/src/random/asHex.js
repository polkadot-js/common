// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const bufferToHex = require('@polkadot/util/buffer/toHex');

const randomAsBuffer = require('./asBuffer');

module.exports = function randomAsHex (length?: number = 32): string {
  return bufferToHex(
    randomAsBuffer(length)
  );
};
