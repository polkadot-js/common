// Copyright 2017-2018 @polkadot/trie-db authors & contributors
// This software may be modified and distributed under the terms
// of the MPL-2.0 license. See the LICENSE file for details.

import { BaseDb } from './types';

type StorageHash = {
  [index: string]: Uint8Array
};

export default class HashDb implements BaseDb {
  private storage: StorageHash = {};

  del (key: Uint8Array): void {
    delete this.storage[key.toString()];
  }

  get (key: Uint8Array): Uint8Array | null {
    return this.storage[key.toString()] || null;
  }

  put (key: Uint8Array, value: Uint8Array): void {
    this.storage[key.toString()] = value;
  }
}
