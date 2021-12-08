// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@polkadot/util/types';

import { hasBigInt, u8aToU8a } from '@polkadot/util';
import { isReady, sha256, sha512 } from '@polkadot/wasm-crypto';
import { sha256 as sha256Js } from '@polkadot/x-noble-hashes/sha256';
import { sha512 as sha512Js } from '@polkadot/x-noble-hashes/sha512';

import { createBitHasher } from '../helpers';

type BitLength = 256 | 512;

/**
 * @name shaAsU8a
 * @summary Creates a sha Uint8Array from the input.
 */
export function shaAsU8a (value: HexString | Buffer | Uint8Array | string, bitLength: BitLength = 256, onlyJs?: boolean): Uint8Array {
  const is256 = bitLength === 256;
  const u8a = u8aToU8a(value);

  return !hasBigInt || (!onlyJs && isReady())
    ? is256
      ? sha256(u8a)
      : sha512(u8a)
    : is256
      ? sha256Js(u8a)
      : sha512Js(u8a);
}

/**
 * @name sha256AsU8a
 * @summary Creates a sha256 Uint8Array from the input.
 */
export const sha256AsU8a = createBitHasher(256, shaAsU8a);

/**
 * @name sha512AsU8a
 * @summary Creates a sha512 Uint8Array from the input.
 */
export const sha512AsU8a = createBitHasher(512, shaAsU8a);
