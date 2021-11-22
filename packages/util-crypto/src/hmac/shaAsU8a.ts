// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { hmac } from '@noble/hashes/lib/hmac';
import { sha256 } from '@noble/hashes/lib/sha256';
import { sha512 } from '@noble/hashes/lib/sha512';

import { hasBigInt, u8aToU8a } from '@polkadot/util';
import { hmacSha256, hmacSha512, isReady } from '@polkadot/wasm-crypto';

type HashFn = (key: Uint8Array | string, data: Uint8Array, onlyJs?: boolean) => Uint8Array;

function createSha (bitLength: 256 | 512 = 256): HashFn {
  return (key: Uint8Array | string, data: Uint8Array, onlyJs?: boolean): Uint8Array =>
    hmacShaAsU8a(key, data, bitLength, onlyJs);
}

export function hmacShaAsU8a (key: Uint8Array | string, data: Uint8Array, bitLength: 256 | 512 = 256, onlyJs?: boolean): Uint8Array {
  const is256 = bitLength === 256;
  const u8aKey = u8aToU8a(key);

  return !hasBigInt || (!onlyJs && isReady())
    ? is256
      ? hmacSha256(u8aKey, data)
      : hmacSha512(u8aKey, data)
    : is256
      ? hmac(sha256, u8aKey, data)
      : hmac(sha512, u8aKey, data);
}

export const hmacSha256AsU8a = createSha(256);
export const hmacSha512AsU8a = createSha(512);
