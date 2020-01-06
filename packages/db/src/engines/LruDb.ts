// Copyright 2017-2020 @polkadot/db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { BaseDb, ProgressCb } from '../types';

import { LRUMap } from 'lru_map';
import { logger } from '@polkadot/util';

interface CachedValue {
  value: Uint8Array | null;
}

const DEFAULT_ITEM_COUNT = 4096;

const l = logger('db/lru');

export default class LruDb implements BaseDb {
  private backing: BaseDb;

  private lru: LRUMap<string, CachedValue>;

  constructor (backing: BaseDb, itemCount: number = DEFAULT_ITEM_COUNT) {
    this.backing = backing;
    this.lru = new LRUMap(itemCount);
  }

  public close (): void {
    l.debug((): string[] => ['close']);

    this.lru.clear();
    this.backing.close();
  }

  public open (): void {
    l.debug((): string[] => ['open']);

    this.lru.clear();
    this.backing.open();
  }

  public drop (): void {
    this.backing.drop();
  }

  public empty (): void {
    l.debug((): string[] => ['empty']);

    this.lru.clear();
    this.backing.empty();
  }

  public rename (base: string, file: string): void {
    this.backing.rename(base, file);
  }

  public maintain (fn: ProgressCb): void {
    this.backing.maintain(fn);
  }

  public size (): number {
    return this.backing.size();
  }

  public del (key: Uint8Array): void {
    const keyStr = key.toString();

    this.backing.del(key);
    this.lru.set(keyStr, { value: null });
  }

  public get (key: Uint8Array): Uint8Array | null {
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
  public _getLru (key: Uint8Array): CachedValue | undefined {
    return this.lru.get(key.toString());
  }

  public put (key: Uint8Array, value: Uint8Array): void {
    const keyStr = key.toString();

    this.backing.put(key, value);
    this.lru.set(keyStr, { value });
  }

  public txCommit (): void {
    if (this.backing.txCommit) {
      this.backing.txCommit();
    }
  }

  public txRevert (): void {
    if (this.backing.txRevert) {
      this.backing.txRevert();
    }
  }

  public txStart (): void {
    if (this.backing.txStart) {
      this.backing.txStart();
    }
  }
}
