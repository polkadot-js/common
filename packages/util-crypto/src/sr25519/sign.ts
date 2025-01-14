// Copyright 2017-2025 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Keypair } from '../types.js';

import * as sr25519 from 'micro-sr25519';

import { u8aToU8a } from '@polkadot/util';

/**
 * @name sr25519Sign
 * @description Returns message signature of `message`, using the supplied pair
 */
export function sr25519Sign (message: string | Uint8Array, { publicKey, secretKey }: Partial<Keypair>): Uint8Array {
  if (publicKey?.length !== 32) {
    throw new Error('Expected a valid publicKey, 32-bytes');
  } else if (secretKey?.length !== 64) {
    throw new Error('Expected a valid secretKey, 64-bytes');
  }

  return sr25519.sign(secretKey, u8aToU8a(message));
}
