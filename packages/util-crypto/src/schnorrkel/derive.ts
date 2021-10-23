// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@polkadot/util/types';
import type { Keypair } from '../types';

import { u8aToU8a } from '@polkadot/util';
import { sr25519DeriveKeypairHard, sr25519DeriveKeypairSoft } from '@polkadot/wasm-crypto';

import { schnorrkelKeypairFromU8a } from './keypair/fromU8a';
import { schnorrkelKeypairToU8a } from './keypair/toU8a';

export function schnorrkelDerive (isHard: boolean): (keypair: Keypair, chainCode: HexString | Uint8Array | string) => Keypair {
  const deriveFn = isHard
    ? sr25519DeriveKeypairHard
    : sr25519DeriveKeypairSoft;

  return (keypair: Keypair, chainCode: HexString | Uint8Array | string) =>
    schnorrkelKeypairFromU8a(
      deriveFn(
        schnorrkelKeypairToU8a(keypair),
        u8aToU8a(chainCode)
      )
    );
}
