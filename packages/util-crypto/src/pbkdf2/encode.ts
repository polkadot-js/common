// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { pbkdf2Sync } from 'pbkdf2';
import { bufferToU8a, u8aToBuffer, u8aToU8a } from '@polkadot/util';

import randomAsU8a from '../random/asU8a';

interface Result {
  password: Uint8Array;
  salt: Uint8Array;
}

export default function pbkdf2Encode (passphrase?: Uint8Array | string, salt = randomAsU8a(), rounds = 64, length = 2048): Result {
  const password = bufferToU8a(
    pbkdf2Sync(u8aToBuffer(u8aToU8a(passphrase)), u8aToBuffer(salt), rounds, length)
  );

  return { password, salt };
}
