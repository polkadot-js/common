// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Keypair } from '../../types';

const SEC_LEN = 64;
const PUB_LEN = 32;

export function schnorrkelKeypairFromU8a (full: Uint8Array): Keypair {
  return {
    publicKey: full.slice(SEC_LEN, SEC_LEN + PUB_LEN),
    secretKey: full.slice(0, SEC_LEN)
  };
}
