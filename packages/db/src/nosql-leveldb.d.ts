// Copyright 2017-2018 @polkadot/db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

type LevelDbOptions$Open = {
  createIfMissing?: boolean,
  errorIfExists?: boolean,
  compression?: boolean,
  cacheSize?: boolean
};

type LevelDbOptions$Get ={
  asBuffer?: boolean,
  fillCache?: boolean
};

type LevelDbOptions$Put ={
  sync?: boolean
};

declare interface LevelDb {
  openSync (options?: LevelDbOptions$Open): void;
  closeSync (): void;

  delSync (key: Buffer): void;
  getSync (key: Buffer, options?: LevelDbOptions$Get): Buffer;
  putSync (key: Buffer, value: Buffer, options?: LevelDbOptions$Put): void;
}

declare module 'nosql-leveldb' {
  const leveldb: (location: string) => LevelDb;

  export default leveldb;
}
