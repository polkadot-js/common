// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@polkadot/util/types';

import { u8aToU8a } from '@polkadot/util';
import { isReady, pbkdf2 } from '@polkadot/wasm-crypto';

import { randomAsU8a } from '../random/asU8a';
import { pbkdf2Sync } from './pbkdf2';

interface Result {
  password: Uint8Array;
  rounds: number;
  salt: Uint8Array;
}

export function pbkdf2Encode (passphrase?: HexString | Buffer | Uint8Array | string, salt: Buffer | Uint8Array = randomAsU8a(), rounds = 2048, onlyJs?: boolean): Result {
  const u8aPass = u8aToU8a(passphrase);
  const u8aSalt = u8aToU8a(salt);

  return {
    password: !onlyJs && isReady()
      ? pbkdf2(u8aPass, u8aSalt, rounds)
      : pbkdf2Sync(u8aPass, u8aSalt, rounds),
    rounds,
    salt
  };
}
