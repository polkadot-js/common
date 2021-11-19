// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import hash from 'hash.js';

/**
 * @name sha256AsU8a
 * @summary Creates sha-256 hash of the input.
 */
export function sha256AsU8a (data: Uint8Array): Uint8Array {
  return new Uint8Array(
    hash
      .sha256()
      .update(data)
      .digest()
  );
}
