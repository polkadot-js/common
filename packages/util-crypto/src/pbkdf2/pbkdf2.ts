// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

// Adapted from https://gist.github.com/calvinmetcalf/91e8e84dc63c75f2aa53

import { bnToU8a, u8aConcat } from '@polkadot/util';

import { hmacSha512 } from '../hmac';

type HmacFn = (key: Uint8Array | string, data: Uint8Array) => Uint8Array;

export function pbkdf2HmacSync (hmac: HmacFn, password: Uint8Array, salt: Uint8Array, rounds: number, len: number): Uint8Array {
  let out = new Uint8Array();
  let num = 0;
  const block = u8aConcat(salt, new Uint8Array(4));

  while (out.length < len) {
    num++;
    block.set(bnToU8a(num, { bitLength: 32, isLe: false }), salt.length);

    let prev = hmac(password, block);
    const md = prev;
    let i = 0;

    while (++i < rounds) {
      prev = hmac(password, prev);

      let j = -1;

      while (++j < prev.length) {
        md[j] ^= prev[j];
      }
    }

    out = u8aConcat(out, md);
  }

  return out.slice(0, len);
}

export function pbkdf2Sync (password: Uint8Array, salt: Uint8Array, rounds: number, len = 64): Uint8Array {
  return pbkdf2HmacSync(hmacSha512, password, salt, rounds, len);
}
