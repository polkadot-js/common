// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Params } from './types';

import scrypt from 'scryptsy';
import { bufferToU8a, u8aToBuffer, u8aToU8a } from '@polkadot/util';

import randomAsU8a from '../random/asU8a';

interface Result {
  params: Params,
  password: Uint8Array;
  salt: Uint8Array;
}

const DEFAULT_PARAMS = {
  N: 1 << 15,
  p: 1,
  r: 8
};

export default function scryptEncode (passphrase?: Uint8Array | string, salt = randomAsU8a(), params = DEFAULT_PARAMS): Result {
  const password = bufferToU8a(
    scrypt(u8aToBuffer(u8aToU8a(passphrase)), u8aToBuffer(salt), params.N, params.r, params.p, 64)
  );

  return { params, password, salt };
}
