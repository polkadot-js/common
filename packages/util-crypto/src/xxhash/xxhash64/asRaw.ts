// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import xxhash64AsValue from './asValue';

export default function xxhash64AsRaw (data: Buffer | Uint8Array | string, seed: number): string {
  return xxhash64AsValue(data, seed).toString(16);
}
