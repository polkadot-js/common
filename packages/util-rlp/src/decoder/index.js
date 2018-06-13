// Copyright 2017-2018 @polkadot/util-rlp authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const assert = require('@polkadot/util/assert');

const internalDecode = require('./decode');

// flowlint-next-line unclear-type:off
module.exports = function decoder (input?: Uint8Array): Uint8Array | Array<any> {
  if (!input || input.length === 0) {
    return new Uint8Array([]);
  }

  const { decoded, remainder } = internalDecode(input);

  assert(remainder.length === 0, 'invalid remainder');

  return decoded;
};
