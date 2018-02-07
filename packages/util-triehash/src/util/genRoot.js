// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Trie$Pairs } from '../types';

const keccakAsU8a = require('@polkadot/util-crypto/keccak/asU8a');
const rlp = require('rlp');

const encode = require('./encode');

module.exports = function genRoot (pairs: Trie$Pairs): Uint8Array {
  return keccakAsU8a(
    rlp.encode(
      // $FlowFixMe rlp definition is not 100%
      encode(pairs, 0)
    )
  );
};
