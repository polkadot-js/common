// Copyright 2017-2018 @polkadot/db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

declare interface Snappy {
  compressSync (input: Buffer): Buffer;
  uncompressSync (input: Buffer): Buffer;
}

declare module 'snappy' {
  const snappy: Snappy;

  export default snappy;
}
