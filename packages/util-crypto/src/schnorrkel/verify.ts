// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import '../polyfill';

import { assert, u8aToU8a } from '@polkadot/util';
import { sr25519Verify } from '@polkadot/wasm-crypto';

/**
 * @name schnorrkelVerify
 * @description Verifies the signature of `message`, using the supplied pair
 */
export default function schnorrkelVerify (message: Uint8Array | string, signature: Uint8Array | string, publicKey: Uint8Array | string): boolean {
  const messageU8a = u8aToU8a(message);
  const publicKeyU8a = u8aToU8a(publicKey);
  const signatureU8a = u8aToU8a(signature);

  assert(publicKeyU8a.length === 32, `Invalid publicKey, received ${publicKeyU8a.length} bytes, expected 32`);
  assert(signatureU8a.length === 64, `Invalid signature, received ${signatureU8a.length} bytes, expected 64`);

  return sr25519Verify(signatureU8a, messageU8a, publicKeyU8a);
}
