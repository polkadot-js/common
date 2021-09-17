// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { hmacSha } from './sha';

export function hmacSha512 (key: Uint8Array | string, data: Uint8Array): Uint8Array {
  return hmacSha(key, data, true);
}
