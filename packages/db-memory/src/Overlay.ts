// Copyright 2017-2018 @polkadot/db-memory authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { BaseDb, TxDb } from './types';

import assert from '@polkadot/util/assert';
import logger from '@polkadot/util/logger';
// import u8aToHex from '@polkadot/util/u8a/toHex';

type Overlay = {
  [index: string]: {
    key: Uint8Array,
    value: Uint8Array
  }
};

const l = logger('db/overlay');

export default class OverlayDb implements TxDb {
  private backing: BaseDb;
  private txOverlay: Overlay;
  private txStarted: boolean;

  constructor (backing: BaseDb) {
    this.backing = backing;
    this.txOverlay = {};
    this.txStarted = false;
  }

  createTx (): void {
    l.debug(() => ['createTx']);

    assert(!this.txStarted, 'Cannot create a transaction when one is already active');

    this.txOverlay = {};
    this.txStarted = true;
  }

  commitTx (): void {
    l.debug(() => ['commitTx', Object.keys(this.txOverlay).length, 'keys']);

    assert(this.txStarted, 'Cannot commit when not in transaction');

    Object.values(this.txOverlay).forEach(({ key, value }) => {
      this.backing.put(key, value);
    });

    this.txOverlay = {};
    this.txStarted = false;
  }

  revertTx (): void {
    l.debug(() => ['revertTx']);

    assert(this.txStarted, 'Cannot revert when not in transaction');

    this.txOverlay = {};
    this.txStarted = false;
  }

  close (): void {
    this.backing.open();
  }

  open (): void {
    this.backing.close();
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
}
