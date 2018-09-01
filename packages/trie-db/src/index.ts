// Copyright 2017-2018 @polkadot/trie-db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { TxDb, ProgressCb } from '@polkadot/db/types';
import { TrieDb, Node, NodeBranch, NodeEncodedOrEmpty, NodeKv, NodeNotEmpty, NodeType } from './types';

import MemoryDb from '@polkadot/db/Memory';
import isNull from '@polkadot/util/is/null';
import logger from '@polkadot/util/logger';
import u8aConcat from '@polkadot/util/u8a/concat';
import hashing from '@polkadot/util-crypto/keccak/asU8a';
import toNibbles from '@polkadot/trie-hash/util/asNibbles';

import { isBranchNode, isEmptyNode, isExtensionNode, isKvNode, isLeafNode } from './util/is';
import { extractKey, keyEquals, keyStartsWith, computeExtensionKey, computeLeafKey, consumeCommonPrefix } from './util/key';
import { decodeNibbles, encodeNibbles } from './util/nibbles';
import { getNodeType, decodeNode, encodeNode } from './util/node';
import { EMPTY_HASH, EMPTY_U8A } from './constants';

const l = logger('trie/db');

export default class Trie implements TrieDb {
  private db: TxDb;
  private txRoot: Uint8Array;
  private rootHash: Uint8Array;

  constructor (db?: TxDb, rootHash: Uint8Array = EMPTY_HASH) {
    this.db = db || new MemoryDb();
    this.rootHash = rootHash;
    this.txRoot = rootHash;
  }

  private createCheckpoint (): Uint8Array {
    this.txRoot = this.rootHash;

    return this.txRoot;
  }

  private commitCheckpoint (): Uint8Array {
    return this.rootHash;
  }

  private revertCheckpoint (): Uint8Array {
    this.rootHash = this.txRoot;

    return this.rootHash;
  }

  transaction (fn: () => boolean): Uint8Array {
    try {
      this.createCheckpoint();

      return this.db.transaction(fn)
        ? this.commitCheckpoint()
        : this.revertCheckpoint();
    } catch (error) {
      this.revertCheckpoint();

      throw error;
    }
  }

  open (): void {
    this.db.open();
  }

  close (): void {
    this.db.close();
  }

  maintain (fn: ProgressCb): void {
    this.db.maintain(fn);
  }

  del (key: Uint8Array) {
    l.debug(() => ['del', { key }]);

    this._setRootNode(
      this._del(
        this.getNode(this.rootHash),
        toNibbles(key)
      )
    );
  }

  get (key: Uint8Array): Uint8Array | null {
    l.debug(() => ['get', { key }]);

    return this._get(
      this.getNode(this.rootHash),
      toNibbles(key)
    );
  }

  put (key: Uint8Array, value: Uint8Array): void {
    l.debug(() => ['put', { key, value }]);

    this._setRootNode(
      this._put(
        this.getNode(this.rootHash),
        toNibbles(key),
        value
      )
    );
  }

  getRoot (): Uint8Array {
    const rootNode = this.getNode(this.rootHash);

    if (isNull(rootNode)) {
      return EMPTY_U8A;
    }

    return this.rootHash;
  }

  setRoot (rootHash: Uint8Array): void {
    this.rootHash = rootHash;
    // return this._setRootNode(rootNode);
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

  private _del (node: Node, trieKey: Uint8Array): Node {
    // l.debug(() => ['_del', { node, trieKey }]);

    if (isEmptyNode(node)) {
      return null;
    } else if (isBranchNode(node)) {
      return this._delBranchNode(node, trieKey);
    } else if (isKvNode(node)) {
      return this._delKvNode(node, trieKey);
    }

    throw new Error('Unreachable');
  }

  private _delBranchNode (node: NodeBranch, trieKey: Uint8Array): Node {
    // l.debug(() => ['_delBranchNode', { node, trieKey }]);

    if (trieKey.length === 0) {
      node[node.length - 1] = null;

      return this._normaliseBranchNode(node);
    }

    const nodeToDelete = this.getNode(node[trieKey[0]]);
    const subNode = this._del(nodeToDelete, trieKey.subarray(1));
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

  private _delKvNode (node: NodeNotEmpty, trieKey: Uint8Array): Node {
    // l.debug(() => ['_delKvNode', { node, trieKey }]);

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
    const newSub = this._del(subNode, subKey);
    const encodedNewSub = this._persistNode(newSub);

    if (keyEquals(encodedNewSub, node[1])) {
      return node;
    } else if (isNull(newSub)) {
      return null;
    }

    if (isKvNode(newSub)) {
      const subNibbles = decodeNibbles(newSub[0]);
      const newKey = u8aConcat(currentKey, subNibbles);

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
    // l.debug(() => ['_get', { node, trieKey }]);

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
    // l.debug(() => ['_getBranchNode', { node, trieKey }]);

    if (trieKey.length === 0) {
      return node[16];
    }

    const subNode = this.getNode(node[trieKey[0]]);

    return this._get(subNode, trieKey.subarray(1));
  }

  private _getKvNode (node: NodeKv, trieKey: Uint8Array): NodeEncodedOrEmpty {
    // l.debug(() => ['_getKvNode', { node, trieKey }]);

    const currentKey = extractKey(node);
    const nodeType = getNodeType(node);

    l.debug(() => [{ currentKey, trieKey, nodeType }]);

    if (nodeType === NodeType.LEAF) {
      if (keyEquals(trieKey, currentKey)) {
        return node[1];
      }

      return null;
    } else if (nodeType === NodeType.EXTENSION) {
      if (keyStartsWith(trieKey, currentKey)) {
        const subNode = this.getNode(node[1]);

        return this._get(subNode, trieKey.subarray(currentKey ? currentKey.length : 0));
      }

      return null;
    }

    throw new Error('Unreachable');
  }

  private _nodeToDbMapping (node: Node): NodeNotEmpty {
    // l.debug(() => ['_nodeToDbMapping', { node }]);

    if (isEmptyNode(node)) {
      return [
        null,
        null
      ];
    }

    const encoded = encodeNode(node);

    if (encoded.length < 32) {
      return [
        // @ts-ignore Ok, this is not correct - this comes back as an embedded node, which mean that our definitions here are completely wrong (or what we think it is, does not align with what it should be as per the spec and implementation)
        node,
        null
      ];
    }

    return [
      hashing(encoded),
      encoded
    ];
  }

  private _normaliseBranchNode (node: NodeNotEmpty): Node {
    // l.debug(() => ['_normaliseBranchNode', { node }]);

    const mapped = node
      .map((value, index) => ({
        index,
        value
      }))
      .filter(({ value }) =>
        !!value && value.length !== 0
      );

    if (mapped.length >= 2) {
      return node;
    }

    if (node[16]) {
      return [
        computeLeafKey(new Uint8Array()),
        node[16]
      ];
    }

    const [{ index, value }] = mapped;
    const subNode = this.getNode(value);

    if (isBranchNode(subNode)) {
      return [
        encodeNibbles(new Uint8Array([index])),
        this._persistNode(subNode)
      ];
    } else if (isKvNode(subNode)) {
      const subNibbles = decodeNibbles(subNode[0]);
      const newKey = u8aConcat(new Uint8Array([index]), subNibbles);

      return [
        encodeNibbles(newKey),
        subNode[1]
      ];
    }

    throw new Error('Unreachable');
  }

  private _persistNode (node: Node): NodeEncodedOrEmpty {
    const [key, value] = this._nodeToDbMapping(node);

    // l.debug(() => ['_persistNode', { node, key, value }]);

    if (value) {
      this.db.put(key as Uint8Array, value);
    }

    return key;
  }

  private _put (node: Node, trieKey: Uint8Array, value: Uint8Array): NodeNotEmpty {
    // l.debug(() => ['_put', { node, trieKey, value }]);

    if (isEmptyNode(node)) {
      return [
        computeLeafKey(trieKey),
        value
      ];
    } else if (isKvNode(node)) {
      return this._putKvNode(node, trieKey, value);
    } else if (isBranchNode(node)) {
      return this._putBranchNode(node, trieKey, value);
    }

    throw new Error('Unreachable');
  }

  private _putBranchNode (node: NodeBranch, trieKey: Uint8Array, value: Uint8Array): NodeNotEmpty {
    // l.debug(() => ['_putBranchNode', { node, trieKey, value }]);

    if (trieKey && trieKey.length) {
      const subNode = this.getNode(node[trieKey[0]]);
      const newNode = this._put(subNode, trieKey.subarray(1), value);

      node[trieKey[0]] = this._persistNode(newNode);
    } else {
      node[node.length - 1] = value;
    }

    return node;
  }

  private _putKvNode (node: NodeKv, trieKey: Uint8Array, value: Uint8Array): NodeNotEmpty {
    // l.debug(() => ['_putKvNode', { node, trieKey, value }]);

    const currentKey = extractKey(node);
    const [commonPrefix, currentRemainder, trieRemainder] = consumeCommonPrefix(currentKey, trieKey);
    const isExtension = isExtensionNode(node);
    const isLeaf = isLeafNode(node);
    let newNode: NodeNotEmpty;

    l.debug(() => ['_putKvNode', { currentKey, commonPrefix, currentRemainder, trieRemainder }]);

    if (currentRemainder.length === 0 && trieRemainder.length === 0) {
      if (isLeaf) {
        return [
          node[0],
          value
        ];
      }

      const subNode = this.getNode(node[1]);

      newNode = this._put(subNode, trieRemainder, value);
    } else if (currentRemainder.length === 0) {
      if (isExtension) {
        const subNode = this.getNode(node[1]);

        newNode = this._put(subNode, trieRemainder, value);
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

    // l.debug(() => ['newNode', newNode]);

    if (commonPrefix.length) {
      return [
        computeExtensionKey(commonPrefix),
        this._persistNode(newNode)
      ];
    }

    return newNode;
  }

  private _setRootNode (node: Node): void {
    // l.debug(() => ['_setRootNode', { node }]);

    if (isEmptyNode(node)) {
      this.rootHash = EMPTY_HASH;
    } else {
      const encoded = encodeNode(node);
      const newHash = hashing(encoded);

      this.db.put(newHash, encoded);

      this.rootHash = newHash;
    }
  }
}
