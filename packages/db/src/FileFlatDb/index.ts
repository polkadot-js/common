// Copyright 2017-2019 @polkadot/db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { BaseDb, BaseDbOptions, ProgressCb } from '../types';
import { Key, NibbleBuffer, Value } from './types';

import fs from 'fs';
import path from 'path';
import { logger } from '@polkadot/util';

import defaults from './defaults';
import Compact from './Compact';
import Impl from './Impl';

const l = logger('db/flat');

export default class FileFlatDb extends Impl implements BaseDb {
  constructor (base: string, file: string = defaults.DEFAULT_FILE, options: BaseDbOptions = {}) {
    super(base, file, options);
  }

  open (): void {
    this.assertOpen(false);

    this._open(this._path);
    this._lruBranch.clear();
    this._lruData.clear();
  }

  close (): void {
    this.assertOpen();

    this._close();
    this._lruBranch.clear();
    this._lruData.clear();
  }

  drop (): void {
    this.assertOpen(false);

    fs.unlinkSync(this._path);
  }

  empty (): void {
    this.assertOpen(false);

    this._open(this._path, true);
  }

  size (): number {
    return this._fileSize;
  }

  rename (base: string, file: string): void {
    this.assertOpen(false);

    const oldPath = this._path;

    this._file = file;
    this._path = path.join(base, file);

    fs.renameSync(oldPath, this._path);
  }

  maintain (fn: ProgressCb): void {
    this.assertOpen(false);

    const compactor = new Compact(this._file);

    compactor.maintain(fn);
  }

  del (key: Uint8Array): void {
    throw new Error('delete not implemented, only stubbed');
  }

  get (key: Uint8Array): Uint8Array | null {
    this.assertOpen();

    l.debug(() => ['get', { key }]);

    const desc = this.findKey(this._serializeKey(key), false);

    if (!desc) {
      return null;
    }

    const result = this.readValue(desc);

    return result && result.value
      ? this._deserializeValue(result.value)
      : null;
  }

  put (key: Uint8Array, value: Uint8Array): void {
    this.assertOpen();

    l.debug(() => ['set', { key, value }]);

    const desc = this.findKey(this._serializeKey(key), true);

    if (!desc) {
      throw new Error('Unable to create key');
    }

    this.writeValue(
      desc,
      this._serializeValue(value)
    );
  }

  protected findKey (key: NibbleBuffer, doCreate: boolean): Key | null {
    const result = this._findKey(key, doCreate, 0, 0);

    l.debug(() => ['findKey', { result }]);

    return result;
  }

  protected readValue ({ keyValue }: Key): Value {
    const result = this._readValue(keyValue);

    l.debug(() => ['readValue', { result }]);

    return result;
  }

  protected writeValue ({ keyAt, keyValue }: Key, value: Buffer): Value {
    const result = this._writeValue(keyAt, keyValue, value);

    l.debug(() => ['writeValue', '=>', { result }]);

    return result;
  }
}
