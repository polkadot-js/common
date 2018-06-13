// Copyright 2017-2018 @polkadot/util-triehash authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Trie$Pairs } from '../types';

const keccakAsU8a = require('@polkadot/util-crypto/keccak/asU8a');
const rlpEncode = require('@polkadot/util-rlp/encode');

const encode = require('./index');

// flowlint-next-line unclear-type:off
module.exports = function encodeAux (pairs: Trie$Pairs, preLength: number): any {
  const encoded = encode(pairs, preLength);
  const rlped = rlpEncode(encoded);

  if (rlped.length <= 31) {
    return encoded;
  }

  return keccakAsU8a(rlped);
};
