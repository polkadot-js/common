// Copyright 2017-2018 @polkadot/trie-db-ext authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { NodeType } from './types';

import { EMPTY_HASH } from './constants';

import isNull from '@polkadot/util/is/null';
import hashing from '@polkadot/util-crypto/keccak/asU8a';
import nodeDecode from '@polkadot/util-rlp/decode';
import nodeEncode from '@polkadot/util-rlp/encode';
import fromNibbles from '@polkadot/trie-hash/util/fromNibbles';
import toNibbles from '@polkadot/trie-hash/util/asNibbles';

type NodeEmpty = null;
type NodeEncoded = Uint8Array;
type NodeEncodedOrEmpty = NodeEncoded | NodeEmpty;
type NodeBranch = [
  NodeEncodedOrEmpty, NodeEncodedOrEmpty, NodeEncodedOrEmpty, NodeEncodedOrEmpty,
  NodeEncodedOrEmpty, NodeEncodedOrEmpty, NodeEncodedOrEmpty, NodeEncodedOrEmpty,
  NodeEncodedOrEmpty, NodeEncodedOrEmpty, NodeEncodedOrEmpty, NodeEncodedOrEmpty,
  NodeEncodedOrEmpty, NodeEncodedOrEmpty, NodeEncodedOrEmpty, NodeEncodedOrEmpty,
  NodeEncodedOrEmpty
];
type EncodedPath = Uint8Array | null;
type NodeKv = [EncodedPath, NodeEncodedOrEmpty];
type NodeNotEmpty = NodeKv | NodeBranch;
type Node = NodeEmpty | NodeNotEmpty;

const NIBBLE_TERMINATOR = 16;
const HP_FLAG_2 = 2;
const HP_FLAG_0 = 0;

const NEEDS_TERMINATOR = [HP_FLAG_2, HP_FLAG_2 + 1];
const IS_ODD_LENGTH = [HP_FLAG_0 + 1, HP_FLAG_2 + 1];

function isEmptyNode (node: Node): node is NodeEmpty {
  return !isNull(node);
}

function isKvNode (node: Node): node is NodeKv {
  return !isEmptyNode(node) && node.length === 2;
}

function isExtensionNode (node: Node): node is NodeKv {
  return getNodeType(node) === NodeType.EXTENSION;
}

function isLeafNode (node: Node): node is NodeKv {
  return getNodeType(node) === NodeType.LEAF;
}

function isBranchNode (node: Node): node is NodeBranch {
  return !isEmptyNode(node) && node.length === 17;
}

function decodeNode (encoded: Uint8Array | Node): Node {
  if (isNull(encoded) || encoded.length === 0) {
    return null;
  } else if (Array.isArray(encoded)) {
    return encoded;
  }

  return nodeDecode(encoded) as Node;
}

function extractKey (node: Node): Uint8Array {
  if (!isKvNode(node)) {
    throw new Error('Can only extract keys from KV branches');
  }

  const [prefixedKey] = node;

  return removeNibblesTerminator(
    decodeNibbles(prefixedKey)
  );
}

function keyEquals (key: Uint8Array | null, test: Uint8Array | null): boolean {
  if (isNull(key) && isNull(test)) {
    return true;
  } else if (isNull(key) || isNull(test) || (key.length !== test.length)) {
    return false;
  }

  return keyStartsWith(key, test);
}

function keyStartsWith (key: Uint8Array | null, partial: Uint8Array | null): boolean {
  if (isNull(key) && isNull(partial)) {
    return true;
  } else if (isNull(key) || isNull(partial) || (key.length < partial.length)) {
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

function decodeNibbles (value: NodeEncodedOrEmpty): Uint8Array {
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

function computeExtensionKey (nibbles: Uint8Array): EncodedPath {
  return encodeNibbles(nibbles);
}

function computeLeafKey (nibbles: Uint8Array): EncodedPath {
  return encodeNibbles(
    addNibblesTerminator(nibbles)
  );
}

function getCommonPrefixLength (left: Uint8Array, right: Uint8Array): number {
  for (let index = 0; index < left.length && index < right.length; index++) {
    if (left[index] !== right[index]) {
      return index;
    }
  }

  return Math.min(left.length, right.length);
}

function consumeCommonPrefix (left: Uint8Array, right: Uint8Array): [Uint8Array, Uint8Array, Uint8Array] {
  const length = getCommonPrefixLength(left, right);

  return [
    left.subarray(0, length),
    left.subarray(length),
    right.subarray(length)
  ];
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

  get (key: Uint8Array): Uint8Array | null {
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
      return this._deleteBranchNode(node, trieKey);
    } else if (isKvNode(node)) {
      return this._deleteKvNode(node, trieKey);
    }

    throw new Error('Unreachable');
  }

  private _deleteBranchNode (node: NodeBranch, trieKey: Uint8Array): Node {
    if (trieKey.length === 0) {
      node[node.length - 1] = null;

      return this._normaliseBranchNode(node);
    }

    const nodeToDelete = this.getNode(node[trieKey[0]]);
    const subNode = this._delete(nodeToDelete, trieKey.subarray(1));
    const encodedSubNode = this._persistNode(subNode);

    if (keyEquals(encodedSubNode, node[trieKey[0]])) {
      return node;
    }

    node[trieKey[0]] = encodedSubNode;

    if (isNull(encodedSubNode)) {
      return this._normaliseBranchNode(node);
    }

    return node;
  }

  private _deleteKvNode (node: NodeNotEmpty, trieKey: Uint8Array): Node {
    const currentKey = extractKey(node);
    const nodeType = getNodeType(node);

    if (!keyStartsWith(trieKey, currentKey)) {
      return node;
    }

    if (nodeType === NodeType.LEAF) {
      return keyEquals(trieKey, currentKey)
        ? null
        : node;
    }

    const subKey = trieKey.subarray(currentKey.length);
    const subNode = this.getNode(node[1]);
    const newSub = this._delete(subNode, subKey);
    const encodedNewSub = this._persistNode(newSub);

    if (keyEquals(encodedNewSub, node[1])) {
      return node;
    } else if (isNull(newSub)) {
      return null;
    }

    if (isKvNode(newSub)) {
      const subNibbles = decodeNibbles(newSub[0]);
      const newKey = new Uint8Array(currentKey.length + subNibbles.length);

      newKey.set(currentKey);
      newKey.set(subNibbles, currentKey.length);

      return [
        encodeNibbles(newKey),
        newSub[1]
      ];
    } else if (isBranchNode(newSub)) {
      return [
        encodeNibbles(currentKey),
        encodedNewSub
      ];
    }

    throw new Error('Unreachable');
  }

  private _get (node: Node, trieKey: Uint8Array): NodeEncodedOrEmpty {
    if (isEmptyNode(node)) {
      return null;
    } else if (isBranchNode(node)) {
      return this._getBranchNode(node, trieKey);
    } else if (isKvNode(node)) {
      return this._getKvNode(node, trieKey);
    }

    throw new Error('Invalid NodeType');
  }

  private _getBranchNode (node: NodeBranch, trieKey: Uint8Array): NodeEncodedOrEmpty {
    if (trieKey.length === 0) {
      return node[16];
    }

    const subNode = this.getNode(node[trieKey[0]]);

    return this._get(subNode, trieKey.subarray(1));
  }

  private _getKvNode (node: NodeKv, trieKey: Uint8Array): NodeEncodedOrEmpty {
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

        return this._get(subNode, trieKey.subarray(0, currentKey ? currentKey.length : 0));
      }

      return null;
    }

    throw new Error('Unreachable');
  }

  private _nodeToDbMapping (node: Node): NodeNotEmpty {
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

  private _normaliseBranchNode (node: Node): Node {
    // TODO A branch with only a single non-blank item should be turned into a
    // leaf or extension node
    return node;
  }

  private _persistNode (node: Node): NodeEncodedOrEmpty {
    const [key, value] = this._nodeToDbMapping(node);

    if (value) {
      this.db.set(key, value);
    }

    return key;
  }

  private _set (node: Node, trieKey: Uint8Array, value: Uint8Array): NodeNotEmpty {
    if (isEmptyNode(node)) {
      return [
        computeLeafKey(trieKey),
        value
      ];
    } else if (isKvNode(node)) {
      return this._setKvNode(node, trieKey, value);
    } else if (isBranchNode(node)) {
      return this._setBranchNode(node, trieKey, value);
    }

    throw new Error('Unreachable');
  }

  private _setBranchNode (node: NodeBranch, trieKey: Uint8Array, value: Uint8Array): NodeNotEmpty {
    if (trieKey && trieKey.length) {
      const subNode = this.getNode(node[trieKey[0]]);
      const newNode = this._set(subNode, trieKey.subarray(1), value);

      node[trieKey[0]] = this._persistNode(newNode);
    } else {
      node[node.length - 1] = value;
    }

    return node;
  }

  private _setKvNode (node: NodeKv, trieKey: Uint8Array, value: Uint8Array): NodeNotEmpty {
    const currentKey = extractKey(node);
    const [commonPrefix, currentRemainder, trieRemainder] = consumeCommonPrefix(currentKey, trieKey);
    const isExtension = isExtensionNode(node);
    const isLeaf = isLeafNode(node);
    let newNode: NodeNotEmpty;

    if (currentRemainder.length === 0 && trieRemainder.length === 0) {
      if (isLeaf) {
        return [
          node[0],
          value
        ];
      }

      const subNode = this.getNode(node[1]);

      newNode = this._set(subNode, trieRemainder, value);
    } else if (currentRemainder.length === 0) {
      if (isExtension) {
        const subNode = this.getNode(node[1]);

        newNode = this._set(subNode, trieRemainder, value);
      } else {
        const subPosition = trieRemainder[0];
        const subKey = computeLeafKey(trieRemainder.subarray(1));
        const subNode: NodeKv = [subKey, value];

        newNode = [
          null, null, null, null, null, null, null, null,
          null, null, null, null, null, null, null, null,
          node[1]
        ];
        newNode[subPosition] = this._persistNode(subNode);
      }
    } else {
      newNode = [
        null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null,
        null
      ];

      if (currentRemainder.length === 1 && isExtension) {
        newNode[currentRemainder[0]] = node[1];
      } else {
        const computedKey = isExtension
          ? computeExtensionKey(currentRemainder.subarray(1))
          : computeLeafKey(currentRemainder.subarray(1));

        newNode[currentRemainder[0]] = this._persistNode([
          computedKey,
          node[1]
        ]);
      }

      if (trieRemainder.length) {
        newNode[trieRemainder[0]] = this._persistNode([
          computeLeafKey(trieRemainder.subarray(1)),
          value
        ]);
      } else {
        newNode[16] = value;
      }
    }

    if (commonPrefix.length) {
      return [
        computeExtensionKey(commonPrefix),
        this._persistNode(newNode)
      ];
    }

    return newNode;
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
}
