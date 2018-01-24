// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const nacl = require('tweetnacl');

module.exports = function sha512AsU8a (data: Uint8Array): Uint8Array {
  return nacl.hash(data);
};
