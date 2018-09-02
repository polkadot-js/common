// Copyright 2017-2018 @polkadot/db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { BaseDb, ProgressCb } from '../types';

import leveldb, { LevelDb } from 'nosql-leveldb';
import snappy from 'snappy';
import logger from '@polkadot/util/logger';
import bufferToU8a from '@polkadot/util/buffer/toU8a';
import u8aToBuffer from '@polkadot/util/u8a/toBuffer';

// import assert from '@polkadot/util/assert';
// import u8aToHex from '@polkadot/util/u8a/toHex';

const l = logger('db/leveldb');

export default class Level implements BaseDb {
  private db: LevelDb;

  constructor (location: string) {
    this.db = leveldb(location);
  }

  close (): void {
    l.debug(() => ['close']);

    this.db.closeSync();
  }

  open (): void {
    l.debug(() => ['open']);

    this.db.openSync({
      compression: false,
      createIfMissing: true
    });
  }

  maintain (fn: ProgressCb): void {
    fn({
      isCompleted: true,
      keys: 0,
      percent: 100
    });
  }

  del (key: Uint8Array): void {
    this.db.delSync(
      this._serializeKey(key)
    );
  }

  get (key: Uint8Array): Uint8Array | null {
    try {
      return this._deserializeValue(
        this.db.getSync(
          this._serializeKey(key),
          { asBuffer: true }
        )
      );
    } catch (error) {
      return null;
    }
  }

  put (key: Uint8Array, value: Uint8Array): void {
    this.db.putSync(
      this._serializeKey(key),
      this._serializeValue(value)
    );
  }

  private _deserializeValue (value: Buffer): Uint8Array | null {
    return value
      ? bufferToU8a(
        snappy.uncompressSync(value)
      )
      : null;
  }

  private _serializeKey (key: Uint8Array): Buffer {
    return u8aToBuffer(key);
  }

  private _serializeValue (value: Uint8Array): Buffer {
    return snappy.compressSync(
      u8aToBuffer(value)
    );
  }
}
