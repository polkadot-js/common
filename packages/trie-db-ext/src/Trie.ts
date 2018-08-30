// Copyright 2017-2018 @polkadot/trie-db-ext authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { NodeType } from './types';

import { EMPTY_HASH } from './constants';

import hashing from '@polkadot/util-crypto/keccak/asU8a';
import nodeDecode from '@polkadot/util-rlp/decode';
import nodeEncode from '@polkadot/util-rlp/encode';
import fromNibbles from '@polkadot/trie-hash/util/fromNibbles';
import toNibbles from '@polkadot/trie-hash/util/asNibbles';

type NodeEmpty = null;
type NodeEncoded = Uint8Array | NodeEmpty;
type NodeBranch = [
  NodeEncoded, NodeEncoded, NodeEncoded, NodeEncoded,
  NodeEncoded, NodeEncoded, NodeEncoded, NodeEncoded,
  NodeEncoded, NodeEncoded, NodeEncoded, NodeEncoded,
  NodeEncoded, NodeEncoded, NodeEncoded, NodeEncoded,
  NodeEncoded
];
type NodeKv = [NodeEncoded, NodeEncoded];

type Node = NodeEmpty | NodeKv | NodeBranch;

const NIBBLE_TERMINATOR = 16;
const HP_FLAG_2 = 2;
const HP_FLAG_0 = 0;

const NEEDS_TERMINATOR = [HP_FLAG_2, HP_FLAG_2 + 1];
const IS_ODD_LENGTH = [HP_FLAG_0 + 1, HP_FLAG_2 + 1];
const IS_KV_NODE = [NodeType.LEAF, NodeType.EXTENSION];

function isEmptyNode (node: Node): node is NodeEmpty {
  return !node;
}

function isKvNode (node: Node): node is NodeKv {
  return !isEmptyNode(node) && node.length === 2;
}

function isBranchNode (node: Node): node is NodeBranch {
  return !isEmptyNode(node) && node.length === 17;
}

function decodeNode (encoded: Uint8Array | Node): Node {
  if (!encoded || encoded.length === 0) {
    return null;
  } else if (Array.isArray(encoded)) {
    return encoded;
  }

  return nodeDecode(encoded) as Node;
}

function extractKey (node: Node): Uint8Array | null {
  if (!isKvNode(node)) {
    throw new Error('Cano only extract keys from KV branches');
  }

  const [prefixedKey] = node;

  return removeNibblesTerminator(
    decodeNibbles(prefixedKey)
  );
}

function keyEquals (key: Uint8Array | null, test: Uint8Array | null): boolean {
  if (!key && !test) {
    return true;
  } else if (!key || !test || key.length !== test.length) {
    return false;
  }

  return keyStartsWith(key, test);
}

function keyStartsWith (key: Uint8Array | null, partial: Uint8Array | null): boolean {
  if (!key && !partial) {
    return true;
  } else if (!key || !partial || (key.length < partial.length)) {
    return false;
  }

  for (let index = 0; index < partial.length; index++) {
    if (key[index] !== partial[index]) {
      return false;
    }
  }

  return true;
}

function isNibblesTerminated (nibbles: Uint8Array): boolean {
  return nibbles[nibbles.length - 1] === NIBBLE_TERMINATOR;
}

function addNibblesTerminator (nibbles: Uint8Array): Uint8Array {
  if (isNibblesTerminated(nibbles)) {
    return nibbles;
  }

  const terminated = new Uint8Array(nibbles.length + 1);

  terminated.set(nibbles);
  terminated[nibbles.length] = NIBBLE_TERMINATOR;

  return terminated;
}

function removeNibblesTerminator (nibbles: Uint8Array): Uint8Array {
  if (isNibblesTerminated(nibbles)) {
    return nibbles.subarray(0, nibbles.length - 1);
  }

  return nibbles;
}

function decodeNibbles (value: NodeEncoded): Uint8Array {
  const nibblesWithFlag = toNibbles(value);
  const [flag] = nibblesWithFlag;

  const rawNibbles = IS_ODD_LENGTH.includes(flag)
    ? nibblesWithFlag.subarray(1)
    : nibblesWithFlag.subarray(2);

  return NEEDS_TERMINATOR.includes(flag)
    ? addNibblesTerminator(rawNibbles)
    : rawNibbles;
}

function encodeNibbles (nibbles: Uint8Array): NodeEncoded {
  const flag = isNibblesTerminated(nibbles)
    ? HP_FLAG_2
    : HP_FLAG_0;
  const rawNibbles = removeNibblesTerminator(nibbles);
  const prefix = rawNibbles.length % 2
    ? [flag + 1]
    : [flag, 0];
  const prefixed = new Uint8Array(prefix.length + rawNibbles.length);

  prefixed.set(prefix);
  prefixed.set(rawNibbles, prefix.length);

  return fromNibbles(prefixed);
}

function computeLeafKey (nibbles: Uint8Array): NodeEncoded {
  return encodeNibbles(
    addNibblesTerminator(nibbles)
  );
}

function getNodeType (node: Node): NodeType {
  if (isEmptyNode(node)) {
    return NodeType.EMPTY;
  } else if (isKvNode(node)) {
    const [key] = node;
    const nibbles = decodeNibbles(key);

    return isNibblesTerminated(nibbles)
      ? NodeType.LEAF
      : NodeType.EXTENSION;
  } else if (isBranchNode(node)) {
    return NodeType.BRANCH;
  }

  throw new Error(`Unable to determine node type`);
}

export default class Trie {
  private db: any;
  private rootHash: Uint8Array;

  constructor (db: any, rootHash: Uint8Array = EMPTY_HASH) {
    this.db = db;
    this.rootHash = rootHash;
  }

  delete (key: Uint8Array) {
    this._setRootNode(
      this._delete(
        this.getNode(this.rootHash),
        toNibbles(key)
      )
    );
  }

  get (key: Uint8Array): Node {
    return this._get(
      this.getNode(this.rootHash),
      toNibbles(key)
    );
  }

  set (key: Uint8Array, value: Uint8Array): void {
    this._setRootNode(
      this._set(
        this.getNode(this.rootHash),
        toNibbles(key),
        value
      )
    );
  }

  getRoot (): Uint8Array {
    return this.rootHash;
  }

  setRoot (rootHash: Uint8Array): void {
    this.rootHash = rootHash;
  }

  private getNode (hash: Uint8Array | null): Node {
    if (!hash || hash.length === 0 || keyEquals(hash, EMPTY_HASH)) {
      return null;
    } else if (hash.length < 32) {
      return decodeNode(hash);
    }

    return decodeNode(
      this.db.get(hash)
    );
  }

  private _delete (node: Node, trieKey: Uint8Array): Node {
    if (isEmptyNode(node)) {
      return null;
    } else if (isBranchNode(node)) {
      return self._deleteBranchNode(node, trieKey);
    } else if (isKvNode(node)) {
      return this._deleteKvNode(node, trieKey);
    }

    throw new Error('Invalid nodeType');
  }

  private _deleteBranchNode (node: NodeBranch, trieKey: Uint8Array): Node {
    if (trieKey.length === 0) {
      node[node.length - 1] = null;

      return this._normalizeBranchNode(node);
    }

    const nodeToDelete = this.getNode(node[trieKey[0]]);
    const subNode = this._delete(nodeToDelete, trieKey.subarray(1));
    const encodedSubNode = this._persistNode(subNode);

    if (keyEquals(encodedSubNode, node[trieKey[0]])) {
      return node;
    }

    node[trieKey[0]] = encodedSubNode;

    if (isEmptyNode(encodedSubNode)) {
      return this._normalizeBranchNode(node);
    }

    return node;
  }

  private _get (node: Node, trieKey: Uint8Array): Node {
    if (isEmptyNode(node)) {
      return null;
    } else if (isBranchNode(node)) {
      return this._getBranchNode(node, trieKey);
    } else if (isKvNode(node)) {
      return this._getKvNode(node, trieKey);
    }

    throw new Error('Invalid NodeType');
  }

  private _getBranchNode (node: NodeBranch, trieKey: Uint8Array): Node {
    if (trieKey.length === 0) {
      return node[16];
    }

    const subNode = this.getNode(node[trieKey[0]]);

    return this._get(subNode, trieKey.subarray(1));
  }

  private _getKvNode (node: NodeKv, trieKey: Uint8Array): Node {
    const currentKey = extractKey(node);
    const nodeType = getNodeType(node);

    if (nodeType === NodeType.LEAF) {
      if (keyEquals(trieKey, currentKey)) {
        return node[1];
      }

      return null;
    } else if (nodeType === NodeType.EXTENSION) {
      if (keyStartsWith(trieKey, currentKey)) {
        const subNode = this.getNode(node[1]);

        return this._get(subNode, trieKey.subarray(0, currentKey.length));
      }

      return new Uint8Array();
    }

    throw new Error('Invalid nodeType');
  }

  private _nodeToDbMapping (node: Node): Node {
    if (isEmptyNode(node)) {
      return [
        null,
        null
      ];
    }

    const encoded = nodeEncode(node);

    if (encoded.length < 32) {
      return [
        encoded,
        null
      ];
    }

    return [
      hashing(encoded),
      encoded
    ];
  }

  // private _normaliseBranchNode (node: Node): Node {
  //       iter_node = iter(node)
  //       if any(iter_node) and any(iter_node):
  //           return node

  //       if node[16]:
  //           return [compute_leaf_key([]), node[16]]

  //       sub_node_idx, sub_node_hash = next(
  //           (idx, v)
  //           for idx, v
  //           in enumerate(node[:16])
  //           if v
  //       )
  //       sub_node = self.get_node(sub_node_hash)
  //       sub_node_type = get_node_type(sub_node)

  //       self._prune_node(sub_node)

  //       if sub_node_type in {NODE_TYPE_LEAF, NODE_TYPE_EXTENSION}:
  //           new_subnode_key = encode_nibbles(tuple(itertools.chain(
  //               [sub_node_idx],
  //               decode_nibbles(sub_node[0]),
  //           )))
  //           return [new_subnode_key, sub_node[1]]
  //       elif sub_node_type == NODE_TYPE_BRANCH:
  //           subnode_hash = self._persist_node(sub_node)
  //           return [encode_nibbles([sub_node_idx]), subnode_hash]
  //       else:
  //           raise Exception("Invariant: this code block should be unreachable")

  // }

  private _persistNode (node: Node): Node {
    const [key, value] = this._nodeToDbMapping(node);

    if (value) {
      this.db.set(key, value);
    }

    return key;
  }

  private _set (node: Node, trieKey: Uint8Array, value: Uint8Array): Node {
    const nodeType = getNodeType(node);

    if (nodeType === NodeType.EMPTY) {
      return [
        computeLeafKey(trieKey),
        value
      ];
    } else if (IS_KV_NODE.includes(nodeType)) {
      return this._setKvNode(node, trieKey, value);
    } else if (nodeType === NodeType.BRANCH) {
      return this._setBranchNode(node, trieKey, value);
    }

    throw new Error('Invalid nodeType');
  }

  private _setBranchNode (node: NodeBranch, trieKey: Uint8Array, value: Uint8Array): Node {
    if (trieKey) {
      const subNode = this.getNode(node[trieKey[0]]);
      const newNode = this._set(subNode, trieKey.subarray(1), value);

      node[trieKey[0]] = this._persistNode(newNode);
    } else {
      node[node.length - 1] = value;
    }

    return node;
  }

  private _setRootNode (node: Node): void {
    if (isEmptyNode(node)) {
      this.rootHash = EMPTY_HASH;
    } else {
      const encoded = nodeEncode(node);
      const newHash = hashing(encoded);

      this.db.set(newHash, encoded);

      this.rootHash = newHash;
    }
}
