// Copyright 2015-2018 authors & contributors of https://github.com/ethereumjs/merkle-patricia-tree
// Copyright 2017-2018 @polkadot/trie-db authors & contributors
// This software may be modified and distributed under the terms
// of the MPL-2.0 license. See the LICENSE file for details.

import { HashFn } from './types';

import logger from '@polkadot/util/logger';
import keccakAsU8a from '@polkadot/util-crypto/keccak/asU8a';

import CheckpointTrie from './CheckpointTrie';
import { prove, verifyProof } from './proof';

// const l = logger('trie');

export default class Trie extends CheckpointTrie {
  static prove = prove;
  static verifyProof = verifyProof;

  // @ts-ignore FIXME, we need to properly check the full file
  constructor (db, root, hashing: HashFn = keccakAsU8a) {
    super(db, root, hashing);

    // l.debug('Created Trie');
  }
}
