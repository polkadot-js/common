// Copyright 2017-2018 @polkadot/db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { BaseDb, ProgressCb } from '../types';

// import logger from '@polkadot/util/logger';
// import u8aToHex from '@polkadot/util/u8a/toHex';

type Storage = {
  [index: string]: Uint8Array
};

// const l = logger('db/memory');

export default class MemoryDb implements BaseDb {
  private storage: Storage;

  constructor () {
    this.storage = {};
  }

  close (): void {
    // noop
  }

  open (): void {
    // noop
  }

  maintain (fn: ProgressCb): void {
    fn({
      isCompleted: true,
      keys: Object.keys(this.storage).length,
      percent: 100
    });
  }

  del (key: Uint8Array): void {
    delete this.storage[key.toString()];
  }

  get (key: Uint8Array): Uint8Array | null {
    // l.debug(() => ['get', u8aToHex(key)]);

    return this.storage[key.toString()] || null;
  }

  put (key: Uint8Array, value: Uint8Array): void {
    // l.debug(() => ['put', u8aToHex(key), u8aToHex(value)]);

    this.storage[key.toString()] = value;
  }
}
