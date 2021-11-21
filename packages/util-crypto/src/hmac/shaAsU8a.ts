// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import hash from 'hash.js';

import { u8aToU8a } from '@polkadot/util';
import { hmacSha256, hmacSha512, isReady } from '@polkadot/wasm-crypto';

export function hmacShaAsU8a (key: Uint8Array | string, data: Uint8Array, bitLength: 256 | 512 = 256, onlyJs = false): Uint8Array {
  const is256 = bitLength === 256;
  const u8aKey = u8aToU8a(key);

  return isReady() && !onlyJs
    ? is256
      ? hmacSha256(u8aKey, data)
      : hmacSha512(u8aKey, data)
    : new Uint8Array(
      is256
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ? hash.hmac(hash.sha256, u8aKey).update(data).digest()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        : hash.hmac(hash.sha512, u8aKey).update(data).digest()
    );
}
