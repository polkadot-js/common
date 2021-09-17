// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import hash from 'hash.js';

export function hmacSha (type: typeof hash.sha256 | typeof hash.sha512, key: Uint8Array | string, data: Uint8Array): Uint8Array {
  return Uint8Array.from(
    hash
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .hmac(type, key)
      .update(data)
      .digest());
}
