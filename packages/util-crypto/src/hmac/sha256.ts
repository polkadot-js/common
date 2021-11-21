// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { hmacShaAsU8a } from './asU8a';

export function hmacSha256 (key: Uint8Array | string, data: Uint8Array, onlyJs?: boolean): Uint8Array {
  return hmacShaAsU8a(key, data, 256, onlyJs);
}
