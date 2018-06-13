// Copyright 2017-2018 @polkadot/util-rlp authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const assert = require('@polkadot/util/assert');

module.exports = function safeParseInt (input: Uint8Array): number {
  assert(input[0] > 0, 'invalid RLP: extra zeros');

  return input.reduce((result, value) => (result * 256) + value, 0);
};
