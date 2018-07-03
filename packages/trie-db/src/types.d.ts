// Copyright 2017-2018 @polkadot/trie-db authors & contributors
// This software may be modified and distributed under the terms
// of the MPL-2.0 license. See the LICENSE file for details.

import { Trie$Pairs } from '@polkadot/trie-hash/types';

export interface TrieDb {
  checkpoint: () => void,
  commit: () => void,
  del: (key: Uint8Array) => void,
  get: (key: Uint8Array) => Uint8Array | null,
  put: (key: Uint8Array, value: Uint8Array) => void,
  revert: () => void,
  trieRoot: () => Uint8Array
}

export type Callback = (error?: Error | null, result?: any) => void;

// NOTE This is actually DecodedRlp = Array<Uint8Array | DecodedRlp>, but since the decoder is relatively simple, we get away with the definition below
export type DecodedRlp = Array<Uint8Array | Array<Uint8Array>>;

export type HashFn = (data: Uint8Array) => Uint8Array;

export type Trie$Node$Type = 'branch' | 'extention' | 'leaf';

export interface Trie$Node {
  hash: () => Uint8Array,
  serialize: () => Uint8Array,

  raw: DecodedRlp,
  type: Trie$Node$Type,
  value: Uint8Array
}

type Trie$Find$OnResult = (nodeRef: Uint8Array, node: Trie$Node, nibbles: Array<number>, next: () => void) => void;

export type Trie$Base = {
  _findDbNodes (onResult: Trie$Find$OnResult, onDone: Callback): void,
  _findValueNodes (onResult: Trie$Find$OnResult, onDone: Callback): void
};

export type SemaphorePromise = (fn: () => Promise<any>) => Promise<any>;

type NodeFactory = {
  fromBranch (rlp: DecodedRlp): Trie$Node
  fromRaw (rlp: DecodedRlp): Trie$Node,
  fromExtention (key: Uint8Array, value: Uint8Array): Trie$Node,
  fromLeaf (key: Uint8Array, value: Uint8Array): Trie$Node
}
