// Copyright 2017-2019 @polkadot/db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { BaseDb, BaseDbOptions, ProgressCb } from '../types';

import lmdb from 'node-lmdb';

export default class LmDb implements BaseDb {
  private _env: lmdb.Env;
  private _dbi: lmdb.Dbi;
  private _txn;

  constructor (base: string, name: string, options?: BaseDbOptions) {
    this._env = new lmdb.Env();
  }

  close (): void {
    this._lmdb.close();
  }

  open (): void {
    this._lmdb.open({
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
  }

  txRevert (): void {
    this._txn.abort();
  }

  txStart (): void {
    this._txn = this._env.beginTxn();
  }

  del (key: Uint8Array): void {
    this._txn.
  }

  get (key: Uint8Array): Uint8Array | null {

  }

  put (key: Uint8Array, value: Uint8Array): void {

  }
}
