// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import xx from 'xxhashjs';

import { isBuffer, isString, u8aToBuffer } from '@polkadot/util';

export default function xxhash64AsValue (data: Buffer | Uint8Array | string, seed: number): number {
  if (isBuffer(data) || isString(data)) {
    return xx.h64(data, seed);
  }

  return xx.h64(
    u8aToBuffer(data),
    seed
  );
}
