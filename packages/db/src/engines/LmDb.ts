// Copyright 2017-2019 @polkadot/db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { BaseDb, BaseDbOptions, ProgressCb } from '../types';

import mkdirp from 'mkdirp';
import lmdb from 'node-lmdb';
import path from 'path';
import { bufferToU8a, u8aToBuffer } from '@polkadot/util/index';

export default class LmDb implements BaseDb {
  private _env: any;
  private _dbi: any | null;
  private _path: string;
  private _txn: any;

  constructor (base: string, name: string, options?: BaseDbOptions) {
    this._env = new lmdb.Env();
    this._path = path.join(base, name);

    mkdirp.sync(this._path);

    this._env.open({
      path: this._path
    });
  }

  close (): void {
    this._dbi.close();
    this._dbi = null;
  }

  open (): void {
    this._dbi = this._env.openDbi({
      create: true,
      name: null,
      keyIsBuffer: true
    });

    this.txStart();
  }

  drop (): void {
    throw new Error('drop() not implemented');
  }

  empty (): void {
    throw new Error('empty() not implemented');
  }

  maintain (fn: ProgressCb): void {
    fn({
      isCompleted: true,
      keys: 0,
      percent: 100
    });
  }

  rename (base: string, file: string): void {
    // nothing
  }

  size (): number {
    return 0;
  }

  txCommit (): void {
    this._txn.commit();

    this.txStart();
  }

  txRevert (): void {
    this._txn.abort();

    this.txStart();
  }

  txStart (): void {
    this._txn = this._env.beginTxn();
  }

  del (key: Uint8Array): void {
    this._txn.del(this._dbi, u8aToBuffer(key));
  }

  get (key: Uint8Array): Uint8Array | null {
    const value = this._txn.getBinary(this._dbi, u8aToBuffer(key));

    return value
      ? bufferToU8a(value)
      : null;
  }

  put (key: Uint8Array, value: Uint8Array): void {
    this._txn.putBinary(this._dbi, u8aToBuffer(key), u8aToBuffer(value));
  }
}
