// Copyright 2017-2018 @polkadot/db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { BaseDb, TxDb, ProgressCb } from '../types';

import assert from '@polkadot/util/assert';
import logger from '@polkadot/util/logger';
import isNull from '@polkadot/util/is/null';

type Overlay = {
  [index: string]: {
    key: Uint8Array,
    value: Uint8Array | null
  }
};

const l = logger('db/transact');

export default class TransactionDb implements TxDb {
  private backing: BaseDb;
  private txOverlay: Overlay;
  private txStarted: boolean;

  constructor (backing: BaseDb) {
    this.backing = backing;
    this.txOverlay = {};
    this.txStarted = false;
  }

  transaction (fn: () => boolean): boolean {
    l.debug(() => ['transaction']);

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

  close (): void {
    this.backing.close();
  }

  open (): void {
    this.backing.open();
  }

  maintain (fn: ProgressCb): void {
    assert(this.txStarted === false, 'Cannot maintain inside an open transaction');

    this.backing.maintain(fn);
  }

  del (key: Uint8Array): void {
    if (this.txStarted) {
      this.txOverlay[key.toString()] = {
        key,
        value: null
      };
      return;
    }

    this.backing.del(key);
  }

  get (key: Uint8Array): Uint8Array | null {
    // l.debug(() => ['get', u8aToHex(key)]);

    if (this.txStarted) {
      const value = this.txOverlay[key.toString()];

      if (value) {
        return value.value;
      }
    }

    return this.backing.get(key);
  }

  put (key: Uint8Array, value: Uint8Array): void {
    // l.debug(() => ['put', u8aToHex(key), u8aToHex(value)]);

    if (this.txStarted) {
      this.txOverlay[key.toString()] = {
        key,
        value
      };

      return;
    }

    return this.backing.put(key, value);
  }

  private createTx (): void {
    l.debug(() => ['createTx']);

    assert(!this.txStarted, 'Cannot create a transaction when one is already active');

    this.txOverlay = {};
    this.txStarted = true;
  }

  private commitTx (): void {
    l.debug(() => ['commitTx', Object.keys(this.txOverlay).length, 'keys']);

    assert(this.txStarted, 'Cannot commit when not in transaction');

    Object.values(this.txOverlay).forEach(({ key, value }) => {
      if (isNull(value)) {
        this.backing.del(key);
      } else {
        this.backing.put(key, value);
      }
    });

    this.txOverlay = {};
    this.txStarted = false;
  }

  private revertTx (): void {
    l.debug(() => ['revertTx']);

    assert(this.txStarted, 'Cannot revert when not in transaction');

    this.txOverlay = {};
    this.txStarted = false;
  }
}
