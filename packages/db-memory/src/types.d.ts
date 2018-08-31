// Copyright 2017-2018 @polkadot/trie-db-ext authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

export interface BaseDb {
  get (key: Uint8Array): Uint8Array | null;
  put (key: Uint8Array, value: Uint8Array): void;
}

export interface TxDb extends BaseDb {
  createTx (): void;
  commitTx (): void;
  revertTx (): void;
}
