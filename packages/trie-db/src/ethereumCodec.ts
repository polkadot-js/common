// Copyright 2017-2018 @polkadot/trie-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import decode from '@polkadot/util-rlp/decode';
import encode from '@polkadot/util-rlp/encode';

import { blake2AsU8a as hashing } from '@polkadot/util-crypto/index';

export default {
  decode,
  encode,
  hashing
};
