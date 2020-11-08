// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

declare module 'xxhashjs/lib/xxhash64' {
  export interface HashInterface {
    (data: string | Buffer, seed: number): number;
  }

  const h64: HashInterface;

  export = h64;
}
