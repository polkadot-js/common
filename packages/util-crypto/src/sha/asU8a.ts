// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@polkadot/util/types';

import { sha256 as sha256Js } from '@noble/hashes/lib/sha256';
import { sha512 as sha512Js } from '@noble/hashes/lib/sha512';

import { hasBigInt, u8aToU8a } from '@polkadot/util';
import { isReady, sha256, sha512 } from '@polkadot/wasm-crypto';

type HashFn = (value: HexString | Buffer | Uint8Array | string, onlyJs?: boolean) => Uint8Array;

function createSha (bitLength: 256 | 512 = 256): HashFn {
  return (value: HexString | Buffer | Uint8Array | string, onlyJs?: boolean): Uint8Array =>
    shaAsU8a(value, bitLength, onlyJs);
}

/**
 * @name shaAsU8a
 * @summary Creates a sha Uint8Array from the input.
 */
export function shaAsU8a (value: HexString | Buffer | Uint8Array | string, bitLength: 256 | 512 = 256, onlyJs?: boolean): Uint8Array {
  const is256 = bitLength === 256;
  const u8a = u8aToU8a(value);

  return !hasBigInt || (isReady() && !onlyJs)
    ? is256
      ? sha256(u8a)
      : sha512(u8a)
    : is256
      ? sha256Js(u8a)
      : sha512Js(u8a);
}

export const sha256AsU8a = createSha(256);
export const sha512AsU8a = createSha(512);
