// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@polkadot/util/types';
import type { Keypair } from '../types';

import { sr25519DeriveKeypairHard } from '@polkadot/wasm-crypto';

import { schnorrkelDerive } from './derive';

export function schnorrkelDeriveHard (keypair: Keypair, chainCode: HexString | Uint8Array | string): Keypair {
  return schnorrkelDerive(sr25519DeriveKeypairHard, keypair, chainCode);
}
