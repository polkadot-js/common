// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

module.exports = function safeParseInt (input: Uint8Array): number {
  if (input[0] === 0) {
    throw new Error('invalid RLP: extra zeros');
  }

  return input.reduce((result, value) => (result * 256) + value, 0);
};
