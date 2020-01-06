// Copyright 2017-2020 @polkadot/db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { BaseDb, ProgressCb } from '../types';

import { logger } from '@polkadot/util';

const l = logger('db/memory');

export default class MemoryDb implements BaseDb {
  private _storage: Map<string, Uint8Array> = new Map();

  public close (): void {
    this.empty();
  }

  public open (): void {
    this.empty();
  }

  public drop (): void {
    this.empty();
  }

  public empty (): void {
    this._storage.clear();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public rename (base: string, file: string): void {
    l.warn('rename() is not implemented');
  }

  public maintain (fn: ProgressCb): void {
    fn({
      isCompleted: true,
      keys: this._storage.size,
      percent: 100
    });
  }

  public size (): number {
    let size = 0;

    this._storage.forEach((value): void => {
      size += value.length;
    });

    return size;
  }

  public del (key: Uint8Array): void {
    // l.debug(() => ['del', { key }]);

    this._storage.delete(key.toString());
  }

  public get (key: Uint8Array): Uint8Array | null {
    // l.debug(() => ['get', { key }]);

    return this._storage.get(key.toString()) || null;
  }

  public put (key: Uint8Array, value: Uint8Array): void {
    // l.debug(() => ['put', { key, value }]);

    this._storage.set(key.toString(), value);
  }
}
