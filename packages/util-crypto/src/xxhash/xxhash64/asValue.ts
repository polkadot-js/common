// Copyright 2017-2018 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import isBuffer from '@polkadot/util/is/buffer';
import isString from '@polkadot/util/is/string';
import u8aToBuffer from '@polkadot/util/u8a/toBuffer';
import xxhashjs from 'xxhashjs';

export default function xxhash64AsValue (data: Buffer | Uint8Array | string, seed: number): number {
  if (isBuffer(data) || isString(data)) {
    // @ts-ignore Buffer is ArrayBuffer underlying
    return xxhashjs.h64(data, seed);
  }

  return xxhashjs.h64(
    // @ts-ignore conversion works, yields correct result
    u8aToBuffer(data),
    seed
  );
}
