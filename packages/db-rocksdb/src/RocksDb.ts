// Copyright 2017-2018 @polkadot/db-memory authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { BaseDb } from '@polkadot/db-memory/types';

import rocksdb from 'rocksdb-node';
import bufferToU8a from '@polkadot/util/buffer/toU8a';
import u8aToBuffer from '@polkadot/util/u8a/toBuffer';

// import assert from '@polkadot/util/assert';
// import logger from '@polkadot/util/logger';
// import u8aToHex from '@polkadot/util/u8a/toHex';

// const l = logger('db/memory');

export default class RocksDb implements BaseDb {
  private db?: any;
  private location: string;

  constructor (location: string) {
    this.location = location;
  }

  close (): void {
    this.db.close();
  }

  open (): void {
    this.db = rocksdb.open({ create_if_missing: true }, this.location);
  }

  get (key: Uint8Array): Uint8Array | null {
    return bufferToU8a(
      this.db.get({ buffer: true }, u8aToBuffer(key))
    );
  }

  put (key: Uint8Array, value: Uint8Array): void {
    this.db.put(
      u8aToBuffer(key),
      u8aToBuffer(value)
    );
  }
}
