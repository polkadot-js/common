// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import BN from 'bn.js';

import xxhash64AsRaw from './asRaw';

export default function xxhash64AsBn (data: Buffer | Uint8Array | string, seed: number): BN {
  return new BN(
    xxhash64AsRaw(data, seed),
    16
  );
}
