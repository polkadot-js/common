// Copyright 2017-2018 @polkadot/db-diskdown authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { DiskStore } from './types';

import { AbstractLevelDOWN } from 'abstract-leveldown';
import { LRUMap } from 'lru_map';
import isUndefined from '@polkadot/util/is/undefined';
import logger from '@polkadot/util/logger';

import Combined from './store/Combined';
import Scatter from './store/Scatter';

const LRU_SIZE = 8192;

const l = logger('disk/scatter');
const noop = () =>
  undefined;

class DiskDown extends AbstractLevelDOWN {
  _disk: DiskStore;
  _store: LRUMap<string, Buffer>;

  constructor (location: string) {
    super(location);

    // FIXME We only want one of these, however add both to aid in easy
    // debug testing (i.e. remove the one not needed - defaults still to
    // Scatter with the override as set here)
    this._disk = new Combined(location);
    this._disk = new Scatter(location);

    this._store = new LRUMap(LRU_SIZE);
  }

  _batch (array: Array<any>, options: any, callback: Function) {
    l.debug(() => ['_batch', array]);

    array.forEach(({ key, type, value }) => {
      switch (type) {
        case 'del':
          return this._del(key, {}, noop);

        case 'put':
          return this._put(key, value, {}, noop);

        default:
          // ignore
      }
    });

    process.nextTick(callback);
  }

  _del (key: Buffer, options: any, callback: Function) {
    l.debug(() => ['_del', key]);

    this._store.delete(key.toString());
    this._disk.delete(key);

    process.nextTick(callback);
  }

  _get (key: Buffer, options: any, callback: Function) {
    l.debug(() => ['_get', key.toString('hex')]);

    const value = this._store.get(key.toString()) || this._disk.get(key);

    if (isUndefined(value)) {
      process.nextTick(callback, new Error('NotFound'));
      return;
    }

    process.nextTick(callback, null, value);
  }

  _open (options: any, callback: Function) {
    l.debug(() => ['_open', options]);

    process.nextTick(callback, null, this);
  }

  _put (key: Buffer, value: Buffer, options: any, callback: Function) {
    l.debug(() => ['_put', key.toString('hex'), value]);

    this._store.set(key.toString(), value);
    this._disk.set(key, value);

    process.nextTick(callback);
  }
}

export default function (location: string) {
  return new DiskDown(location);
}
