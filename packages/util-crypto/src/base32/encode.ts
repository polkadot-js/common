// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

// adapted from https://github.com/multiformats/js-multibase/blob/424709195b46ffb1d6f2f69a7707598ebe751e5e/src/rfc4648.js

import type { U8aLike } from '@polkadot/util/types';

import { u8aToU8a } from '@polkadot/util';

import { BASE32_ALPHABET, BITS_PER_CHAR } from './bs32';

const MASK = (1 << BITS_PER_CHAR) - 1;

/**
 * @name base32Encode
 * @summary Creates a base32 value.
 * @description
 * From the provided input, create the base32 and return the result as a string.
 */
export function base32Encode (value: U8aLike, ipfsCompat = false): string {
  const u8a = u8aToU8a(value);
  let out = '';
  let bits = 0;
  let buffer = 0;

  for (let i = 0; i < u8a.length; ++i) {
    buffer = (buffer << 8) | u8a[i];
    bits += 8;

    while (bits > BITS_PER_CHAR) {
      bits -= BITS_PER_CHAR;
      out += BASE32_ALPHABET[MASK & (buffer >> bits)];
    }
  }

  if (bits) {
    out += BASE32_ALPHABET[MASK & (buffer << (BITS_PER_CHAR - bits))];
  }

  return ipfsCompat
    ? `b${out}`
    : out;
}
