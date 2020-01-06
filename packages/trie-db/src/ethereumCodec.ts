// Copyright 2017-2020 @polkadot/trie-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Codec } from '@polkadot/trie-codec/types';

import { blake2AsU8a } from '@polkadot/util-crypto';
import { decode, encode } from '@polkadot/util-rlp';

const codec: Codec = {
  decode,
  encode,
  hashing: blake2AsU8a,
  type: 'Ethereum'
};

export default codec;
