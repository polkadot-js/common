// Copyright 2017-2018 @polkadot/db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { BaseDb, BaseDbOptions, ProgressCb } from '../types';

import { logger } from '@polkadot/util/index';

type Storage = {
  [index: string]: Uint8Array
};

const l = logger('db/memory');

export default class MemoryDb implements BaseDb {
  private storage: Storage;

  constructor (options?: BaseDbOptions) {
    this.storage = {};
  }

  close (): void {
    this.empty();
  }

  open (): void {
    this.empty();
  }

  drop (): void {
    this.empty();
  }

  empty (): void {
    this.storage = {};
  }

  rename (base: string, file: string): void {
    l.error('rename() is not implemented');
  }

  maintain (fn: ProgressCb): void {
    fn({
      isCompleted: true,
      keys: Object.keys(this.storage).length,
      percent: 100
    });
  }

  size (): number {
    l.error('size() is not implemented');

    return 0;
  }

  del (key: Uint8Array): void {
    // l.debug(() => ['del', { key }]);

    delete this.storage[key.toString()];
  }

  get (key: Uint8Array): Uint8Array | null {
    // l.debug(() => ['get', { key }]);

    return this.storage[key.toString()] || null;
  }

  put (key: Uint8Array, value: Uint8Array): void {
    // l.debug(() => ['put', { key, value }]);

    this.storage[key.toString()] = value;
  }
}
