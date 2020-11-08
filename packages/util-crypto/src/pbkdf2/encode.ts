// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { u8aToU8a } from '@polkadot/util';
import { isReady, pbkdf2 } from '@polkadot/wasm-crypto';

import { randomAsU8a } from '../random/asU8a';
import { pbkdf2Sync } from './pbkdf2';

interface Result {
  password: Uint8Array;
  rounds: number;
  salt: Uint8Array;
}

export function pbkdf2Encode (passphrase?: Buffer | Uint8Array | string, salt: Buffer | Uint8Array = randomAsU8a(), rounds = 2048, onlyJs = false): Result {
  const u8aPass = u8aToU8a(passphrase);
  const u8aSalt = u8aToU8a(salt);
  const password = isReady() && !onlyJs
    ? pbkdf2(u8aPass, u8aSalt, rounds)
    : pbkdf2Sync(u8aPass, u8aSalt, rounds, 64);

  return { password, rounds, salt };
}
