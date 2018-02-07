// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Trie$Pairs } from '../types';

const u8aToBuffer = require('@polkadot/util/u8a/toBuffer');
const keccakAsU8a = require('@polkadot/util-crypto/keccak/asU8a');
const rlpEncode = require('@polkadot/util-rlp/encode');

const encode = require('./encode');

module.exports = function genRoot (pairs: Trie$Pairs): Uint8Array {
  return keccakAsU8a(
    u8aToBuffer(
      rlpEncode(
        encode(pairs, 0)
      )
    )
  );
};
