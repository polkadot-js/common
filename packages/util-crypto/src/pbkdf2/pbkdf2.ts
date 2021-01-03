// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

// Adapted from https://gist.github.com/calvinmetcalf/91e8e84dc63c75f2aa53

import hash from 'hash.js';

import { u8aConcat } from '@polkadot/util';

export function pbkdf2Sync (password: Uint8Array, salt: Uint8Array, rounds: number, len = 64): Uint8Array {
  let out = new Uint8Array();
  let num = 0;
  const block = Buffer.concat([salt, Buffer.from([0, 0, 0, 0])]);

  while (out.length < len) {
    num++;
    block.writeUInt32BE(num, salt.length);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    let prev = hash.hmac(hash.sha512, password).update(block).digest();
    const md = prev;
    let i = 0;

    while (++i < rounds) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      prev = hash.hmac(hash.sha512, password).update(prev).digest();

      let j = -1;

      while (++j < prev.length) {
        md[j] ^= prev[j];
      }
    }

    out = u8aConcat(out, md);
  }

  return out.slice(0, len);
}
