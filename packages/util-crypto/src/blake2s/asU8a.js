// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

// TODO: For Node we can also use node-blake2 (npm blake2)
const blakejs = require('blakejs');

module.exports = function blake2sAsU8a (data: Uint8Array): Uint8Array {
  return blakejs.blake2s(data);
};
