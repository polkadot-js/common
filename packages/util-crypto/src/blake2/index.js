// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const blake2AsHex = require('./asHex');
const blake2AsHex128 = require('./asHex128');
const blake2AsHex256 = require('./asHex256');
const blake2AsHex512 = require('./asHex512');

module.exports = {
  blake2AsHex,
  blake2AsHex128,
  blake2AsHex256,
  blake2AsHex512
};
