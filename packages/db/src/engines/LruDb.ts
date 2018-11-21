// Copyright 2017-2018 @polkadot/db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { BaseDb, ProgressCb } from '../types';

import { LRUMap } from 'lru_map';
import { logger } from '@polkadot/util/index';

type CachedValue = {
  value: Uint8Array | null
};

const DEFAULT_ITEM_COUNT = 4096;

const l = logger('db/lru');

export default class LruDb implements BaseDb {
  private backing: BaseDb;
  private lru: LRUMap<string, CachedValue>;

  constructor (backing: BaseDb, itemCount: number = DEFAULT_ITEM_COUNT) {
    this.backing = backing;
    this.lru = new LRUMap(itemCount);
  }

  close (): void {
    l.debug(() => ['close']);

    this.lru.clear();
    this.backing.close();
  }

  open (): void {
    l.debug(() => ['open']);

    this.lru.clear();
    this.backing.open();
  }

  drop (): void {
    this.backing.drop();
  }

  empty (): void {
    l.debug(() => ['empty']);

    this.lru.clear();
    this.backing.empty();
  }

  rename (base: string, file: string): void {
    this.backing.rename(base, file);
  }

  maintain (fn: ProgressCb): void {
    this.backing.maintain(fn);
  }

  size (): number {
    return this.backing.size();
  }

  del (key: Uint8Array): void {
    const keyStr = key.toString();

    this.backing.del(key);
    this.lru.set(keyStr, { value: null });
  }

  get (key: Uint8Array): Uint8Array | null {
    const keyStr = key.toString();
    const cached = this.lru.get(keyStr);

    if (cached) {
      return cached.value;
    }

    const value = this.backing.get(key);

    this.lru.set(keyStr, { value });

    return value;
  }

  // Convenience methods used in tests
  _getLru (key: Uint8Array): CachedValue | undefined {
    return this.lru.get(key.toString());
  }

  put (key: Uint8Array, value: Uint8Array): void {
    const keyStr = key.toString();

    this.backing.put(key, value);
    this.lru.set(keyStr, { value });
  }
}
