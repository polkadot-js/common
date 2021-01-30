// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import hash from 'hash.js';

export function hmacSha256 (key: Uint8Array | string, data: Uint8Array): Uint8Array {
  return Uint8Array.from(
    hash
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .hmac(hash.sha256, key)
      .update(data)
      .digest());
}
