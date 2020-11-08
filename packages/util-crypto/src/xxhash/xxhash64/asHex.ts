// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { hexAddPrefix } from '@polkadot/util';

import xxhash64AsRaw from './asRaw';

export default function xxhash64AsHex (data: Buffer | Uint8Array | string, seed: number): string {
  return hexAddPrefix(
    xxhash64AsRaw(data, seed)
  );
}
