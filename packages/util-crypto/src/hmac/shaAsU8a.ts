// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import hash from 'hash.js';

import { u8aToU8a } from '@polkadot/util';
import { hmacSha256, hmacSha512 } from '@polkadot/wasm-crypto';

import { isWasmOnly } from '../helpers';

type BitLength = 256 | 512;

type HashFn = (key: Uint8Array | string, data: Uint8Array, onlyJs?: boolean) => Uint8Array;

function createSha (bitLength: BitLength): HashFn {
  return (key: Uint8Array | string, data: Uint8Array, onlyJs?: boolean): Uint8Array =>
    hmacShaAsU8a(key, data, bitLength, onlyJs);
}

export function hmacShaAsU8a (key: Uint8Array | string, data: Uint8Array, bitLength: BitLength = 256, onlyJs?: boolean): Uint8Array {
  const is256 = bitLength === 256;
  const u8aKey = u8aToU8a(key);

  return isWasmOnly(onlyJs)
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

export const hmacSha256AsU8a = createSha(256);
export const hmacSha512AsU8a = createSha(512);
