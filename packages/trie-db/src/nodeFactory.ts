// Copyright 2015-2018 authors & contributors of https://github.com/ethereumjs/merkle-patricia-tree
// Copyright 2017-2018 @polkadot/trie-db authors & contributors
// This software may be modified and distributed under the terms
// of the MPL-2.0 license. See the LICENSE file for details.

import { Logger } from '@polkadot/util/types';
import { HashFn, DecodedRlp, NodeFactory, Trie$Node, Trie$Node$Type } from './types';

import logger from '@polkadot/util/logger';
// import u8aToHex from '@polkadot/util/u8a/toHex';

import nibblesFromU8a from './nibbles/fromU8a';
// import rlpToString from './util/rlpToString';

import TrieNode from './Node';

const l = logger('trie/node');

/**
 * Determines the node type.
 * @returns {String} - the node type
 *   - leaf - if the node is a leaf
 *   - branch - if the node is a branch
 *   - extention - if the node is an extention
 */
function getNodeType (node: DecodedRlp): Trie$Node$Type {
  if (node.length === 17) {
    return 'branch';
  }

  if (node.length === 2) {
    const key = nibblesFromU8a(node[0] as Uint8Array);

    if (key[0] > 1) {
      return 'leaf';
    }

    return 'extention';
  }

  throw new Error(`Unable to determine Node type`);
}

function fromBranch (l: Logger, hashing: HashFn) {
  return (rlp: DecodedRlp): Trie$Node => {
    // l.debug(() => ['fromBranch']);

    const node = new TrieNode(hashing, 'branch', Array.apply(null, Array(17)));

    // NOTE Removed since
    //   (1) 'branch' is never called with any keys,
    //   (b) `this.set` points to what exactly?
    // if (key) {
    //   key.forEach(function (keyVal) {
    //     this.set.apply(this, keyVal);
    //   });
    // }

    return node;
  };
}

function fromRaw (l: Logger, hashing: HashFn) {
  return (rlp: DecodedRlp): Trie$Node => {
    // l.debug(() => ['fromRaw ->', rlpToString(rlp)]);

    const node = new TrieNode(hashing, getNodeType(rlp), rlp);

    return node;
  };
}

function fromType (l: Logger, hashing: HashFn, type: Trie$Node$Type) {
  return (key: Uint8Array, value: Uint8Array): Trie$Node => {
    // l.debug(() => ['fromType', 'type ->', type, 'key ->', u8aToHex(key), 'value ->', u8aToHex(value, 256)]);

    const node = new TrieNode(hashing, type, Array(2));

    node.setValue(value);
    node.setKey(key);

    return node;
  };
}

export default (hashing: HashFn): NodeFactory => ({
  fromBranch: fromBranch(l, hashing),
  fromExtention: fromType(l, hashing, 'extention'),
  fromLeaf: fromType(l, hashing, 'leaf'),
  fromRaw: fromRaw(l, hashing)
});
