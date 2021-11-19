// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { U8aLike } from '@polkadot/util/types';

import { u8aToU8a } from '@polkadot/util';

import { base32 } from './bs32';

/**
 * @name base32Encode
 * @summary Creates a base32 value.
 * @description
 * From the provided input, create the base32 and return the result as a string.
 */
export function base32Encode (value: U8aLike, ipfsCompat = false): string {
  const out = base32.encode(u8aToU8a(value));

  return ipfsCompat
    ? `b${out}`
    : out;
}
