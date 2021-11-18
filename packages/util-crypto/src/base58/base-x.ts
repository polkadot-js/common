// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

// Original: https://github.com/cryptocoinjs/base-x/blob/d37ae5deee181018cf6f25833fc26b3551ea9fe6/ts_src/index.ts
//
// base-x encoding / decoding
// Copyright (c) 2018 base-x contributors
// Copyright (c) 2014-2018 The Bitcoin Core developers (base58.cpp)
// Distributed under the MIT software license, see the accompanying
// file LICENSE or http://www.opensource.org/licenses/mit-license.php.

// Notes on changes:
//   - converted to only operate on Uint8Array in/out (as per the PR it is from)
//   - use @polkadot/util as applicable
//   - convery decodeU/nsafe to decode (only point used)
//   - skip unneeded checks (conversion on layer above)
//   - it should just take care of bs58, however keeping it generic for now

import type { BaseConverter } from './types';

import { assert } from '@polkadot/util';

export default function baseX (type: 'base58', ALPHABET: string): BaseConverter {
  assert(ALPHABET.length < 255, 'Alphabet too long');

  const BASE_MAP = new Uint8Array(256);

  BASE_MAP.fill(255);

  for (let i = 0; i < ALPHABET.length; i++) {
    const x = ALPHABET.charAt(i);
    const xc = x.charCodeAt(0);

    assert(BASE_MAP[xc] === 255, `${x} is ambiguous`);

    BASE_MAP[xc] = i;
  }

  const BASE = ALPHABET.length;
  const BASE_ERROR = `Non-base ${type} character`;
  const LEADER = ALPHABET.charAt(0);
  const FACTOR = Math.log(BASE) / Math.log(256); // log(BASE) / log(256), rounded up
  const iFACTOR = Math.log(256) / Math.log(BASE); // log(256) / log(BASE), rounded up

  function encode (source: Uint8Array): string {
    if (source.length === 0) {
      return '';
    }

    // Skip & count leading zeroes.
    let zeroes = 0;
    let length = 0;
    let pbegin = 0;
    const pend = source.length;

    while (pbegin !== pend && source[pbegin] === 0) {
      pbegin++;
      zeroes++;
    }

    // Allocate enough space in big-endian base58 representation.
    const size = ((pend - pbegin) * iFACTOR + 1) >>> 0;
    const b58 = new Uint8Array(size);

    // Process the bytes.
    while (pbegin !== pend) {
      let carry = source[pbegin];

      // Apply "b58 = b58 * 256 + ch".
      let i = 0;

      for (let it1 = size - 1; (carry !== 0 || i < length) && (it1 !== -1); it1--, i++) {
        carry += (256 * b58[it1]) >>> 0;
        b58[it1] = (carry % BASE) >>> 0;
        carry = (carry / BASE) >>> 0;
      }

      assert(carry === 0, 'Non-zero carry');

      length = i;
      pbegin++;
    }

    // Skip leading zeroes in base58 result.
    let it2 = size - length;

    while (it2 !== size && b58[it2] === 0) {
      it2++;
    }

    // Translate the result into a string.
    let str = LEADER.repeat(zeroes);

    for (; it2 < size; ++it2) {
      str += ALPHABET.charAt(b58[it2]);
    }

    return str;
  }

  function decode (source: string): Uint8Array {
    if (source.length === 0) {
      return new Uint8Array();
    }

    let psz = 0;

    // Skip leading spaces.
    assert(source[psz] !== ' ', BASE_ERROR);

    // Skip and count leading '1's.
    let zeroes = 0;
    let length = 0;

    while (source[psz] === LEADER) {
      zeroes++;
      psz++;
    }

    // Allocate enough space in big-endian base256 representation.
    const size = (((source.length - psz) * FACTOR) + 1) >>> 0; // log(58) / log(256), rounded up.
    const b256 = new Uint8Array(size);

    // Process the characters.
    while (source[psz]) {
      // Decode character
      let carry = BASE_MAP[source.charCodeAt(psz)];

      // Invalid character
      assert(carry !== 255, BASE_ERROR);

      let i = 0;

      for (let it3 = size - 1; (carry !== 0 || i < length) && (it3 !== -1); it3--, i++) {
        carry += (BASE * b256[it3]) >>> 0;
        b256[it3] = (carry % 256) >>> 0;
        carry = (carry / 256) >>> 0;
      }

      assert(carry === 0, 'Non-zero carry');

      length = i;
      psz++;
    }

    // Skip trailing spaces.
    assert(source[psz] !== ' ', BASE_ERROR);

    // Skip leading zeroes in b256.
    let it4 = size - length;

    while (it4 !== size && b256[it4] === 0) {
      it4++;
    }

    const result = new Uint8Array(zeroes + (size - it4));
    let j = zeroes;

    while (it4 !== size) {
      result[j++] = b256[it4++];
    }

    return result;
  }

  return {
    decode,
    encode
  };
}
