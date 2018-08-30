// Copyright 2017-2018 @polkadot/trie-db-port authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

export enum NodeType {
  EMPTY = 0,
  LEAF = 1,
  EXTENSION = 2,
  BRANCH = 3
}

export type NodeDecoded = Array<Uint8Array | Array<Uint8Array>>;

export type Hasher = (data: Uint8Array) => Uint8Array;

export type Decoder = (input: Uint8Array) => NodeDecoded;

export type Encoder = (input: any) => Uint8Array;
