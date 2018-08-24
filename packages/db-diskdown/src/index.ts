// Copyright 2017-2018 @polkadot/db-diskdown authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { AbstractLevelDOWN } from 'abstract-leveldown';
import fs from 'fs';
import { LRUMap } from 'lru_map';
import logger from '@polkadot/util/logger';
import isUndefined from '@polkadot/util/is/undefined';

type FilePath = {
  exists: boolean,
  path: string
};

const LRU_SIZE = 4096;

const l = logger('db-diskdown');
const noop = () =>
  undefined;

class DiskDown extends AbstractLevelDOWN {
  location: string;
  _store: LRUMap<string, Buffer>;

  constructor (location: string) {
    super(location);

    this.location = location;
    this._store = new LRUMap(LRU_SIZE);
  }

  __getFilePath (key: Buffer, doExistence: boolean): FilePath {
    const path = `${this.location}/${key.toString('hex')}`;
    const exists = doExistence
      ? fs.existsSync(path)
      : false;

    return {
      exists,
      path
    };
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

    const filePath = this.__getFilePath(key, true);

    this._store.delete(key.toString());
    process.nextTick(callback);

    if (filePath.exists) {
      fs.unlinkSync(filePath.path);
    }
  }

  _get (key: Buffer, options: any, callback: Function) {
    l.debug(() => ['_get', key.toString('hex')]);

    const filePath = this.__getFilePath(key, true);
    let value = this._store.get(key.toString());
    const returnValue = () =>
      process.nextTick(callback, null, value);

    if (!isUndefined(value)) {
      return returnValue();
    }

    if (filePath.exists) {
      value = fs.readFileSync(filePath.path);

      return returnValue();
    }

    // 'NotFound' error, consistent with LevelDOWN API
    process.nextTick(callback, new Error('NotFound'));
  }

  _open (options: any, callback: Function) {
    l.debug(() => ['_open', options]);

    this._store.clear();

    process.nextTick(callback, null, this);
  }

  _put (key: Buffer, value: Buffer, options: any, callback: Function) {
    l.debug(() => ['_put', key.toString('hex'), value]);

    const filePath = this.__getFilePath(key, false);

    this._store.set(key.toString(), value);
    fs.writeFileSync(filePath.path, value);
    process.nextTick(callback);
  }
}

export default function (location: string) {
  return new DiskDown(location);
}
