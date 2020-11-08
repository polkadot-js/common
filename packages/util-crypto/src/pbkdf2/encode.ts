// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { pbkdf2Sync } from 'pbkdf2';
import { bufferToU8a, u8aToBuffer, u8aToU8a } from '@polkadot/util';
import { isReady, pbkdf2 } from '@polkadot/wasm-crypto';

import { randomAsU8a } from '../random/asU8a';

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
    : bufferToU8a(pbkdf2Sync(u8aToBuffer(u8aPass), u8aToBuffer(u8aSalt), rounds, 64, 'sha512'));

  return { password, rounds, salt };
}
