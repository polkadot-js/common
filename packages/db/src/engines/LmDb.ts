// Copyright 2017-2019 @polkadot/db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { BaseDb, BaseDbOptions, ProgressCb } from '../types';

import mkdirp from 'mkdirp';
import lmdb from 'node-lmdb';
import path from 'path';
import { bufferToU8a, u8aToBuffer } from '@polkadot/util/index';

const MAPSIZE = 2 * 1024 * 1024 * 1024; // 2GB

export default class LmDb implements BaseDb {
  private _env: any;
  private _dbi: any | null;
  private _path: string;
  private _txn: any | null;

  constructor (base: string, name: string, options?: BaseDbOptions) {
    this._env = new lmdb.Env();
    this._path = path.join(base, name);
    this._txn = null;

    mkdirp.sync(this._path);

    this._env.open({
      path: this._path,
      mapSize: MAPSIZE
    });
  }

  close (): void {
    this._dbi.close();
    this._dbi = null;
    this._env.close();
  }

  open (): void {
    this._dbi = this._env.openDbi({
      create: true,
      keyIsBuffer: true
    });
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
    this._txn = null;
  }

  txRevert (): void {
    this._txn.abort();
    this._txn = null;
  }

  txStart (): void {
    this._txn = this._env.beginTxn();
  }

  del (key: Uint8Array): void {
    this._txn.del(this._dbi, u8aToBuffer(key));
  }

  get (_key: Uint8Array): Uint8Array | null {
    const key = u8aToBuffer(_key);
    const value = this._txn
      ? this._txn.getBinary(this._dbi, key)
      : this.txnGet(key);

    return value
      ? bufferToU8a(value)
      : null;
  }

  private txnGet (key: Buffer): Buffer {
    const txn = this._env.beginTxn();
    const value = txn.getBinary(this._dbi, key);

    txn.abort();

    return value;
  }

  put (key: Uint8Array, value: Uint8Array): void {
    this._txn.putBinary(this._dbi, u8aToBuffer(key), u8aToBuffer(value));
  }
}
