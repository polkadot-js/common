// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import hash from 'hash.js';

export function sha256 (value: Uint8Array): number[] {
  return hash
    .sha256()
    .update(value)
    .digest();
}
