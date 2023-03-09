// Copyright 2017-2023 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@polkadot/util/types';
import type { Params } from './types.js';

import { scrypt as scryptJs } from '@noble/hashes/scrypt';

import { hasBigInt, objectSpread, u8aToU8a } from '@polkadot/util';
import { isReady, scrypt } from '@polkadot/wasm-crypto';

import { randomAsU8a } from '../random/asU8a.js';
import { DEFAULT_PARAMS } from './defaults.js';

interface Result {
  params: Params,
  password: Uint8Array;
  salt: Uint8Array;
}

export function scryptEncode (passphrase?: HexString | Uint8Array | string, salt = randomAsU8a(), params = DEFAULT_PARAMS, onlyJs?: boolean): Result {
  const u8a = u8aToU8a(passphrase);

  return {
    params,
    password: !hasBigInt || (!onlyJs && isReady())
      ? scrypt(u8a, salt, Math.log2(params.N), params.r, params.p)
      : scryptJs(u8a, salt, objectSpread({ dkLen: 64 }, params)),
    salt
  };
}
