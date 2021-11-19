// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@polkadot/util/types';
import type { Result } from './types';

import { scrypt as scryptJs } from '@noble/hashes/lib/scrypt';

import { hasBigInt, objectSpread, u8aToU8a } from '@polkadot/util';
import { isReady, scrypt } from '@polkadot/wasm-crypto';

import { randomAsU8a } from '../random/asU8a';
import { DEFAULT_PARAMS } from './defaults';

export function scryptEncode (passphrase?: HexString | Uint8Array | string, salt = randomAsU8a(), params = DEFAULT_PARAMS, onlyJs = false): Result {
  return {
    params,
    password: !hasBigInt || (isReady() && !onlyJs)
      ? scrypt(u8aToU8a(passphrase), salt, Math.log2(params.N), params.r, params.p)
      : scryptJs(u8aToU8a(passphrase), salt, objectSpread({ dkLen: 64 }, params)),
    salt
  };
}
