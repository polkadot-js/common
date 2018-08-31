// Copyright 2017-2018 @polkadot/trie-db-ext authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

export enum NodeType {
  EMPTY = 0,
  LEAF = 1,
  EXTENSION = 2,
  BRANCH = 3
}

export type NodeEmpty = null;

export type NodeEncoded = Uint8Array;

export type NodeEncodedOrEmpty = NodeEncoded | NodeEmpty;

export type NodeBranch = [
  NodeEncodedOrEmpty, NodeEncodedOrEmpty, NodeEncodedOrEmpty, NodeEncodedOrEmpty,
  NodeEncodedOrEmpty, NodeEncodedOrEmpty, NodeEncodedOrEmpty, NodeEncodedOrEmpty,
  NodeEncodedOrEmpty, NodeEncodedOrEmpty, NodeEncodedOrEmpty, NodeEncodedOrEmpty,
  NodeEncodedOrEmpty, NodeEncodedOrEmpty, NodeEncodedOrEmpty, NodeEncodedOrEmpty,
  NodeEncodedOrEmpty
];

export type EncodedPath = Uint8Array | null;

export type NodeKv = [EncodedPath, NodeEncodedOrEmpty];

export type NodeNotEmpty = NodeKv | NodeBranch;

export type Node = NodeEmpty | NodeNotEmpty;
