// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { hmac } from '@noble/hashes/lib/hmac';
import { sha256 } from '@noble/hashes/lib/sha256';
import { sha512 } from '@noble/hashes/lib/sha512';

import { assert, hasBigInt } from '@polkadot/util';

export function hmacSha (key: Uint8Array | string, data: Uint8Array, is512: boolean): Uint8Array {
  assert(hasBigInt, 'BigInt is required for hmac operations');

  return hmac(is512 ? sha512 : sha256, key, data);
}
