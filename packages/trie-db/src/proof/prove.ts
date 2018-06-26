// Copyright 2015-2018 authors & contributors of https://github.com/ethereumjs/merkle-patricia-tree
// Copyright 2017-2018 @polkadot/trie-db authors & contributors
// This software may be modified and distributed under the terms
// of the MPL-2.0 license. See the LICENSE file for details.

import assert from '@polkadot/util/assert';

/**
 * Returns a merkle proof for a given key
 * @method Trie.prove
 * @param {Trie} trie
 * @param {String} key
 * @return Promise<{Array.<TrieNode>}> `proof`
 */
// @ts-ignore FIXME, we need to properly check the full file
export default async function prove (trie, key) {
  const result = await trie.findPath(key);

  assert(result, 'findPath does not contain a valid path');

  const { remainder, stack } = result;

  assert(remainder.length === 0, 'Node does not contain the key');

  // @ts-ignore FIXME, we need to properly check the full file
  return stack.reduce((proofs, node, index) => {
    const rlp = node.serialize();

    if ((rlp.length >= 32) || (index === 0)) {
      proofs.push(rlp);
    }

    return proofs;
  }, []);
}
