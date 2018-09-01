// Copyright 2017-2018 @polkadot/db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { BaseDb, ProgressCb } from '../types';

import rocksdb from 'rocksdb-node';
import assert from '@polkadot/util/assert';
import logger from '@polkadot/util/logger';
import isUndefined from '@polkadot/util/is/undefined';
import bufferToU8a from '@polkadot/util/buffer/toU8a';
import u8aToBuffer from '@polkadot/util/u8a/toBuffer';

// import assert from '@polkadot/util/assert';
// import u8aToHex from '@polkadot/util/u8a/toHex';

const l = logger('db/rocksdb');

export default class Rocks implements BaseDb {
  // @ts-ignore Guard with assertOpen
  private db: RocksDb;
  private location: string;

  constructor (location: string) {
    this.location = location;
  }

  private assertOpen () {
    assert(!isUndefined(this.db), 'Database needs to be open');
  }

  close (): void {
    l.debug(() => ['close']);

    this.assertOpen();
    this.db.close();

    // @ts-ignore caught with guard
    this.db = undefined;
  }

  open (): void {
    l.debug(() => ['open']);

    this.db = rocksdb.open(
      { create_if_missing: true },
      this.location
    );
  }

  maintain (fn: ProgressCb): void {
    fn({
      isCompleted: true,
      keys: 0,
      percent: 100
    });
  }

  del (key: Uint8Array): void {
    this.assertOpen();
    this.db.del(u8aToBuffer(key));
  }

  get (key: Uint8Array): Uint8Array | null {
    this.assertOpen();

    return bufferToU8a(
      this.db.get(
        { buffer: true },
        u8aToBuffer(key)
      )
    );
  }

  put (key: Uint8Array, value: Uint8Array): void {
    this.assertOpen();

    this.db.put(
      u8aToBuffer(key),
      u8aToBuffer(value)
    );
  }
}
