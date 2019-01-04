// Copyright 2017-2019 @polkadot/trie-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Codec } from '@polkadot/trie-codec/types';

import { blake2AsU8a } from '@polkadot/util-crypto/index';
import { decode, encode } from '@polkadot/util-rlp/index';

const codec: Codec = {
  decode,
  encode,
  hashing: blake2AsU8a,
  type: 'Ethereum'
};

export default codec;
