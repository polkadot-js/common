// Copyright 2017-2019 @polkadot/db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { BaseDb, BaseDbOptions, ProgressCb } from '../types';

import fs from 'fs';
import mkdirp from 'mkdirp';
import lmdb from 'node-lmdb';
import path from 'path';
import { bufferToU8a, logger, u8aToBuffer } from '@polkadot/util/index';

const GB = 1 * 1024 * 1024 * 1024;

const l = logger('db/lmdb');

// NOTE we manage 2 transaction types, one for read and one for write. For
// triedbs we assume that the transaction _only_ contains writes (managed by
// the transaction overlay). At the same time have a read that we keep open
// so we don't need to re-create the transaction, otherwise wastefull.
//
// There is reasoning behind this madness, reads cannot overlap with writes,
// so the database grows more than needed while making actual reads interleaved
// with writes. So manage these completely seperately.
export default class LmDb implements BaseDb {
  private _env: any;
  private _dbi: any | null;
  private _path: string;
  private _rtxn: any | null;
  private _wtxn: any | null;

  constructor (base: string, name: string, options?: BaseDbOptions) {
    this._env = new lmdb.Env();
    this._path = path.join(base, name);
    this._rtxn = null;
    this._wtxn = null;

    mkdirp.sync(this._path);

    const dbsize = this.size(true);
    const mapSize = Math.ceil(1 + (dbsize / GB)) * GB;

    l.debug(() => `Current mapsize set to ${(mapSize / GB).toFixed(1)}GB`);

    this._env.open({
      path: this._path,
      mapSize
    });
  }

  private getNextMapSize (): number {
    const dbsize = this.size();
    const mapSize = this._env.info().mapSize;
    const remaining = (mapSize - dbsize) / GB;

    return (remaining < 0.25)
      ? (mapSize + GB)
      : mapSize;
  }

  private growMapSize (): void {
    const info = this._env.info();
    const next = this.getNextMapSize();

    if (next > info.mapSize) {
      l.debug(() => `Growing mapsize to ${(next / GB).toFixed(1)}GB`);

      this._env.resize(next);
    }
  }

  close (): void {
    this.exitRead();

    this._dbi.close();
    this._dbi = null;
    this._env.close();
  }

  open (): void {
    this._dbi = this._env.openDbi({
      create: true,
      keyIsBuffer: true
    });

    this.enterRead();
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

  size (withExistsSync: boolean = false): number {
    const db = path.join(this._path, 'data.mdb');

    return !withExistsSync || fs.existsSync(db)
      ? fs.statSync(db).size
      : 0;
  }

  private enterRead (): void {
    this._rtxn = this._env.beginTxn({ readOnly: true });
  }

  private exitRead (): void {
    this._rtxn.abort();
    this._rtxn = null;
  }

  txCommit (): void {
    this._wtxn.commit();
    this._wtxn = null;
    this.enterRead();
  }

  txRevert (): void {
    this._wtxn.abort();
    this._wtxn = null;
    this.enterRead();
  }

  txStart (): void {
    this.exitRead();

    // grow between transactions
    this.growMapSize();

    this._wtxn = this._env.beginTxn();
  }

  del (key: Uint8Array): void {
    this._wtxn.del(this._dbi, u8aToBuffer(key));
  }

  get (_key: Uint8Array): Uint8Array | null {
    const value = this._rtxn.getBinary(this._dbi, u8aToBuffer(_key));

    return value
      ? bufferToU8a(value)
      : null;
  }

  put (key: Uint8Array, value: Uint8Array): void {
    this._wtxn.putBinary(this._dbi, u8aToBuffer(key), u8aToBuffer(value));
  }
}
