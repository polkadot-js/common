// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const assert = require('@polkadot/util/assert');

const decode = require('./decode');

// Adapted from https://github.com/ethereumjs/rlp/blob/0ce09db81fc303fcee593f7cc094ba44015f9b92/index.js#L51
module.exports = function rlpDecode (input?: Uint8Array): Uint8Array | Array<*> {
  if (!input || input.length === 0) {
    return new Uint8Array([]);
  }

  const { decoded, remainder } = decode(input);

  assert(remainder.length === 0, 'invalid remainder');

  return decoded;
};
