// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import hash from 'hash.js';

import { u8aToU8a } from '@polkadot/util';
import { hmacSha256, hmacSha512, isReady } from '@polkadot/wasm-crypto';

type BitLength = 256 | 512;

function createSha (bitLength: BitLength): (key: Uint8Array | string, data: Uint8Array, onlyJs?: boolean) => Uint8Array {
  return (key: Uint8Array | string, data: Uint8Array, onlyJs?: boolean): Uint8Array =>
    hmacShaAsU8a(key, data, bitLength, onlyJs);
}

/**
 * @name hmacShaAsU8a
 * @description creates a Hmac Sha (256/512) Uint8Array from the key & data
 */
export function hmacShaAsU8a (key: Uint8Array | string, data: Uint8Array, bitLength: BitLength = 256, onlyJs?: boolean): Uint8Array {
  const is256 = bitLength === 256;
  const u8aKey = u8aToU8a(key);

  return !onlyJs && isReady()
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

/**
 * @name hmacSha256AsU8a
 * @description creates a Hmac Sha256 Uint8Array from the key & data
 */
export const hmacSha256AsU8a = createSha(256);

/**
 * @name hmacSha512AsU8a
 * @description creates a Hmac Sha512 Uint8Array from the key & data
 */
export const hmacSha512AsU8a = createSha(512);
