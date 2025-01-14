// Copyright 2017-2025 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as sr25519 from 'micro-sr25519';

import { u8aToU8a } from '@polkadot/util';

/**
 * @name sr25519Verify
 * @description Verifies the signature of `message`, using the supplied pair
 */
export function sr25519Verify (message: string | Uint8Array, signature: string | Uint8Array, publicKey: string | Uint8Array): boolean {
  const publicKeyU8a = u8aToU8a(publicKey);
  const signatureU8a = u8aToU8a(signature);

  if (publicKeyU8a.length !== 32) {
    throw new Error(`Invalid publicKey, received ${publicKeyU8a.length} bytes, expected 32`);
  } else if (signatureU8a.length !== 64) {
    throw new Error(`Invalid signature, received ${signatureU8a.length} bytes, expected 64`);
  }

  return sr25519.verify(u8aToU8a(message), signatureU8a, publicKeyU8a);
}
