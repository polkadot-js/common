// Copyright 2015-2018 authors & contributors of https://github.com/ethereumjs/merkle-patricia-tree
// Copyright 2017-2018 @polkadot/trie-db authors & contributors
// This software may be modified and distributed under the terms
// of the MPL-2.0 license. See the LICENSE file for details.

import assert from '@polkadot/util/assert';
import decodeRlp from '@polkadot/util-rlp/decode';
import keccakAsU8a from '@polkadot/util-crypto/keccak/asU8a';

import { nibblesMatchingLength, nibblesFromU8a } from '../nibbles';
import nodeFactory from '../nodeFactory';

/**
 * Verifies a merkle proof for a given key
 * @method Trie.verifyProof
 * @param {Buffer | Uint8Array} rootHash
 * @param {String} key
 * @param {Array.<TrieNode>} proof
 * @returns Promise<{String}>
 */
// @ts-ignore FIXME, we need to properly check the full file
export default async function verifyProof (rootHash, _key, proofs) {
  const lastIndex = proofs.length - 1;
  let key = nibblesFromU8a(_key);
  let wantedHash = rootHash;

  for (let i = 0; i < proofs.length; i++) {
    const proof = proofs[i];
    const hash = keccakAsU8a(proof);

    assert(hash.toString() === wantedHash.toString(), `Bad proof node ${i}: hash mismatch`);

    // @ts-ignore FIXME, we need to properly check the full file
    const node = nodeFactory.fromRaw(decodeRlp(proof));
    let cld;

    if (node.type === 'branch') {
      if (key.length === 0) {
        assert(i === lastIndex, 'Additional nodes at end of proof (branch)');

        return node.value;
      }

      cld = node.raw[key[0]];
      key = key.slice(1);

      if (cld.length === 2) {
        // @ts-ignore FIXME, we need to properly check the full file
        const embeddedNode = nodeFactory.fromRaw(cld);

        assert(i === lastIndex, 'Additional nodes at end of proof (embeddedNode)');
        // @ts-ignore FIXME, we need to properly check the full file
        assert(nibblesMatchingLength(embeddedNode.key, key) === embeddedNode.key.length, 'Key length does not match with the proof one (embeddedNode)');

        // @ts-ignore FIXME, we need to properly check the full file
        key = key.slice(embeddedNode.key.length);

        assert(key.length === 0, 'Key does not match with the proof one (embeddedNode)');

        return embeddedNode.value;
      } else {
        wantedHash = cld;
      }
    } else if ((node.type === 'extention') || (node.type === 'leaf')) {
      // @ts-ignore FIXME, we need to properly check the full file
      assert(nibblesMatchingLength(node.key, key) === node.key.length, 'Key does not match with the proof one (extention|leaf)');

      cld = node.value;
      // @ts-ignore FIXME, we need to properly check the full file
      key = key.slice(node.key.length);

      if (key.length === 0) {
        assert(i === lastIndex, 'Additional nodes at end of proof (extention|leaf)');

        return cld;
      } else {
        wantedHash = cld;
      }
    } else {
      throw new Error('Invalid node type');
    }
  }

  throw new Error('Unexpected end of proof');
}
