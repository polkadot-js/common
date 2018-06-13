// Copyright 2017-2018 @polkadot/util-triehash authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Trie$Pairs } from '../types';

const keccakAsU8a = require('@polkadot/util-crypto/keccak/asU8a');
const rlpEncode = require('@polkadot/util-rlp/encode');

const encode = require('../encode');

module.exports = function genRoot (pairs: Trie$Pairs): Uint8Array {
  const encoded = encode(pairs, 0);

  return keccakAsU8a(
    rlpEncode(
      encoded.length
        ? encoded
        : new Uint8Array([])
    )
  );
};
