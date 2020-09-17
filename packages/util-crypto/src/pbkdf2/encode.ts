// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { pbkdf2Sync } from 'pbkdf2';
import { bufferToU8a, u8aToBuffer, u8aToU8a } from '@polkadot/util';
import { isReady, pbkdf2 } from '@polkadot/wasm-crypto';

import randomAsU8a from '../random/asU8a';

interface Result {
  password: Uint8Array;
  rounds: number;
  salt: Uint8Array;
}

export default function pbkdf2Encode (passphrase?: Uint8Array | string, salt = randomAsU8a(), rounds = 2048): Result {
  const u8a = u8aToU8a(passphrase);
  const password = isReady()
    ? pbkdf2(u8a, salt, rounds)
    : bufferToU8a(pbkdf2Sync(u8aToBuffer(u8a), u8aToBuffer(salt), rounds, 64));

  return { password, rounds, salt };
}
