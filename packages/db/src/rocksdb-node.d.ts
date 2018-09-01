// Copyright 2017-2018 @polkadot/db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

type RocksDbOptions$Open = {
  create_if_missing?: boolean
};

type RocksDbOptions$Get ={
  buffer: boolean
};

declare interface RocksDb {
  close (): void;

  del (key: Buffer): void;
  get (options: RocksDbOptions$Get, key: Buffer): Buffer;
  put (key: Buffer, value: Buffer): void;
}

declare module 'rocksdb-node' {
  const rocksdb: {
    open (options: RocksDbOptions$Open, location: string): RocksDb;
  };

  export default rocksdb;
}
