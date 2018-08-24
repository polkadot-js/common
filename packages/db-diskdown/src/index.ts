// Copyright 2017-2018 @polkadot/db-diskdown authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { AbstractLevelDOWN } from 'abstract-leveldown';
import fs from 'fs';
import { LRUMap } from 'lru_map';
import logger from '@polkadot/util/logger';
import mkdirp from 'mkdirp';
import isUndefined from '@polkadot/util/is/undefined';

type FilePathEntry = {
  exists: boolean,
  path: string
};

type FilePath = {
  directory: FilePathEntry,
  file: FilePathEntry
};

const LRU_SIZE = 8192;

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

  private __keyToString (key: Buffer): string {
    return key
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  }

  private __getFilePath (key: Buffer, doExistence: boolean): FilePath {
    // NOTE We want to limit the number of entries in any specific directory. Split the
    // key into parts and use this to construct the path and the actual filename. We want
    // to limit the entries per directory, but at the same time minimize the number of
    // directories we need to create (when non-existent)
    const parts = this.__keyToString(key).match(/.{1,2}/g) || [];
    const directoryPath = `${this.location}/${parts.slice(0, 3).join('/')}`;
    const filePath = `${directoryPath}/${parts.slice(3).join('')}`;
    let directoryExists = false;
    let fileExists = true;

    if (doExistence) {
      fileExists = fs.existsSync(filePath);

      if (fileExists) {
        directoryExists = true;
      } else {
        directoryExists = fs.existsSync(directoryPath);
      }
    }

    return {
      directory: {
        exists: directoryExists,
        path: directoryPath
      },
      file: {
        exists: fileExists,
        path: filePath
      }
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

    if (filePath.file.exists) {
      fs.unlinkSync(filePath.file.path);
    }

    process.nextTick(callback);
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

    if (filePath.file.exists) {
      value = fs.readFileSync(filePath.file.path);

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

    if (!filePath.directory.exists) {
      mkdirp.sync(filePath.directory.path);
    }

    fs.writeFileSync(filePath.file.path, value);

    process.nextTick(callback);
  }
}

export default function (location: string) {
  return new DiskDown(location);
}
