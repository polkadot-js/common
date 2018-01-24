// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const nacl = require('tweetnacl');

module.exports = function randomAsU8a (length?: number = 32): Uint8Array {
  return nacl.randomBytes(length);
};
