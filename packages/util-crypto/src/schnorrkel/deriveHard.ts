// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@polkadot/util/types';
import type { Keypair } from '../types';

import { u8aToU8a } from '@polkadot/util';
import { sr25519DeriveKeypairHard } from '@polkadot/wasm-crypto';

import { schnorrkelKeypairFromU8a } from './keypair/fromU8a';
import { schnorrkelKeypairToU8a } from './keypair/toU8a';

export function schnorrkelDeriveHard (keypair: Keypair, chainCode: HexString | Uint8Array | string): Keypair {
  return schnorrkelKeypairFromU8a(
    sr25519DeriveKeypairHard(schnorrkelKeypairToU8a(keypair), u8aToU8a(chainCode))
  );
}
