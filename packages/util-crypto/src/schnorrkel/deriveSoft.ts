// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Keypair } from '../types';

import '../polyfill';

import { sr25519DeriveKeypairSoft } from '@polkadot/wasm-crypto';

import keypairFromU8a from './keypair/fromU8a';
import keypairToU8a from './keypair/toU8a';

export default function deriveSoft (keypair: Keypair, chainCode: Uint8Array): Keypair {
  return keypairFromU8a(
    sr25519DeriveKeypairSoft(keypairToU8a(keypair), chainCode)
  );
}
