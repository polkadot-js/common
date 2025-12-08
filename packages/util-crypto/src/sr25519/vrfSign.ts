// Copyright 2017-2025 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Keypair } from '../types.js';

import { randomBytes } from '@noble/hashes/utils';
import * as sr25519 from '@scure/sr25519';

import { u8aToU8a } from '@polkadot/util';

const EMPTY_U8A = new Uint8Array();

/**
 * @name sr25519VrfSign
 * @description Sign with sr25519 vrf signing (deterministic)
 */
export function sr25519VrfSign (message: string | Uint8Array, { secretKey }: Partial<Keypair>, context: string | Uint8Array = EMPTY_U8A, extra: string | Uint8Array = EMPTY_U8A): Uint8Array {
  if (secretKey?.length !== 64) {
    throw new Error('Invalid secretKey, expected 64-bytes');
  }

  return sr25519.vrf.sign(u8aToU8a(message), secretKey, u8aToU8a(context), u8aToU8a(extra), randomBytes);
  // return vrfSign(secretKey, u8aToU8a(context), u8aToU8a(message), u8aToU8a(extra));
}
