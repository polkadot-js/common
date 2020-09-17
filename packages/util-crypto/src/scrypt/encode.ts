// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Params } from './types';

import scryptsy from 'scryptsy';
import { bufferToU8a, u8aToBuffer, u8aToU8a } from '@polkadot/util';
import { isReady, scrypt } from '@polkadot/wasm-crypto';

import randomAsU8a from '../random/asU8a';
import { DEFAULT_PARAMS } from './defaults';

interface Result {
  params: Params,
  password: Uint8Array;
  salt: Uint8Array;
}

export default function scryptEncode (passphrase?: Uint8Array | string, salt = randomAsU8a(), params = DEFAULT_PARAMS): Result {
  const password = isReady()
    ? scrypt(u8aToU8a(passphrase), salt, Math.log2(params.N), params.r, params.p)
    : bufferToU8a(
      scryptsy(u8aToBuffer(u8aToU8a(passphrase)), u8aToBuffer(salt), params.N, params.r, params.p, 64)
    );

  return { params, password, salt };
}
