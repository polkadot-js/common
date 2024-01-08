// Copyright 2017-2024 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { hmac } from '@noble/hashes/hmac';
import { sha256 } from '@noble/hashes/sha256';
import { sha512 } from '@noble/hashes/sha512';

import { hasBigInt, u8aToU8a } from '@polkadot/util';
import { hmacSha256, hmacSha512, isReady } from '@polkadot/wasm-crypto';

const JS_HASH = {
  256: sha256,
  512: sha512
};

const WA_MHAC = {
  256: hmacSha256,
  512: hmacSha512
};

function createSha (bitLength: 256 | 512): (key: Uint8Array | string, data: Uint8Array, onlyJs?: boolean) => Uint8Array {
  return (key: Uint8Array | string, data: Uint8Array, onlyJs?: boolean): Uint8Array =>
    hmacShaAsU8a(key, data, bitLength, onlyJs);
}

/**
 * @name hmacShaAsU8a
 * @description creates a Hmac Sha (256/512) Uint8Array from the key & data
 */
export function hmacShaAsU8a (key: Uint8Array | string, data: Uint8Array, bitLength: 256 | 512 = 256, onlyJs?: boolean): Uint8Array {
  const u8aKey = u8aToU8a(key);

  return !hasBigInt || (!onlyJs && isReady())
    ? WA_MHAC[bitLength](u8aKey, data)
    : hmac(JS_HASH[bitLength], u8aKey, data);
}

/**
 * @name hmacSha256AsU8a
 * @description creates a Hmac Sha256 Uint8Array from the key & data
 */
export const hmacSha256AsU8a = /*#__PURE__*/ createSha(256);

/**
 * @name hmacSha512AsU8a
 * @description creates a Hmac Sha512 Uint8Array from the key & data
 */
export const hmacSha512AsU8a = /*#__PURE__*/ createSha(512);
