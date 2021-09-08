// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { U8aLike } from '@polkadot/util/types';

import { u8aToU8a } from '@polkadot/util';

import { bs58 } from './bs58';

/**
 * @name base58Encode
 * @summary Creates a base58 value.
 * @description
 * From the provided input, create the base58 and return the result as a string.
 */
export function base58Encode (value: U8aLike, ipfsCompat?: boolean): string {
  const out = bs58.encode(u8aToU8a(value));

  return ipfsCompat
    ? `z${out}`
    : out;
}
