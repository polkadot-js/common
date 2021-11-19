// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { sha256 as sha256Js } from '@noble/hashes/lib/sha256';

import { assert, hasBigInt } from '@polkadot/util';

export function sha256 (value: Uint8Array): Uint8Array {
  assert(hasBigInt, 'BigInt is required for sha256 operations');

  return sha256Js(value);
}
