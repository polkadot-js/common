// Copyright 2017-2025 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Keypair } from '../types.js';

import * as sr25519 from '@scure/sr25519';

import { isU8a } from '@polkadot/util';

export function createDeriveFn (derive: (pair: Uint8Array, cc: Uint8Array) => Uint8Array): (keypair: Keypair, chainCode: Uint8Array) => Keypair {
  return (keypair: Keypair, chainCode: Uint8Array): Keypair => {
    if (!isU8a(chainCode) || chainCode.length !== 32) {
      throw new Error('Invalid chainCode passed to derive');
    }

    const secretKey = derive(keypair.secretKey, chainCode);
    const publicKey = sr25519.getPublicKey(secretKey);

    return { publicKey, secretKey };
  };
}
