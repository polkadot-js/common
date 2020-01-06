// Copyright 2017-2020 @polkadot/db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { BaseDb, TxDb, ProgressCb } from '../types';

import { assert, isNull, logger } from '@polkadot/util';

interface OverlayItem {
  key: Uint8Array;
  value: Uint8Array | null;
}

const l = logger('db/transact');

export default class TransactionDb implements TxDb {
  private backing: BaseDb;

  private txOverlay: Map<string, OverlayItem> = new Map();

  private txStarted: boolean;

  constructor (backing: BaseDb) {
    this.backing = backing;
    this.txStarted = false;
  }

  public transaction<T> (fn: () => T): T {
    l.debug((): string[] => ['transaction']);

    try {
      this.createTx();

      const result = fn();

      if (result) {
        this.commitTx();
      } else {
        this.revertTx();
      }

      return result;
    } catch (error) {
      this.revertTx();

      throw error;
    }
  }

  public close (): void {
    this.backing.close();
  }

  public open (): void {
    this.backing.open();
  }

  public drop (): void {
    this.backing.drop();
  }

  public empty (): void {
    this.backing.empty();
  }

  public rename (base: string, file: string): void {
    this.backing.rename(base, file);
  }

  public maintain (fn: ProgressCb): void {
    assert(this.txStarted === false, 'Cannot maintain inside an open transaction');

    this.backing.maintain(fn);
  }

  public size (): number {
    return this.backing.size();
  }

  public del (key: Uint8Array): void {
    if (this.txStarted) {
      this.txOverlay.set(key.toString(), { key, value: null });
      return;
    }

    this.backing.del(key);
  }

  public get (key: Uint8Array): Uint8Array | null {
    // l.debug(() => ['get', u8aToHex(key)]);

    if (this.txStarted) {
      const value = this.txOverlay.get(key.toString());

      if (value) {
        return value.value;
      }
    }

    return this.backing.get(key);
  }

  public put (key: Uint8Array, value: Uint8Array): void {
    // l.debug(() => ['put', u8aToHex(key), u8aToHex(value)]);

    if (this.txStarted) {
      this.txOverlay.set(key.toString(), { key, value });

      return;
    }

    return this.backing.put(key, value);
  }

  private createTx (): void {
    l.debug((): string[] => ['createTx']);

    assert(!this.txStarted, 'Cannot create a transaction when one is already active');

    this.txOverlay.clear();
    this.txStarted = true;
  }

  private commitTx (): void {
    l.debug((): [string, number, string] => ['commitTx', Object.keys(this.txOverlay).length, 'keys']);

    assert(this.txStarted, 'Cannot commit when not in transaction');

    if (this.backing.txStart) {
      this.backing.txStart();
    }

    this.txOverlay.forEach(({ key, value }): void => {
      if (isNull(value)) {
        this.backing.del(key);
      } else {
        this.backing.put(key, value);
      }
    });

    if (this.backing.txCommit) {
      this.backing.txCommit();
    }

    this.txOverlay.clear();
    this.txStarted = false;
  }

  private revertTx (): void {
    l.debug((): string[] => ['revertTx']);

    assert(this.txStarted, 'Cannot revert when not in transaction');

    this.txOverlay.clear();
    this.txStarted = false;
  }
}
