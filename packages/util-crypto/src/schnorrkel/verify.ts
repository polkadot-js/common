// Copyright 2017-2019 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import '../polyfill';

import { u8aToU8a } from '@polkadot/util';
import { sr25519Verify } from '@polkadot/wasm-crypto';

/**
 * @name schnorrkelVerify
 * @description Verifies the signature of `message`, using the supplied pair
 */
export default function schnorrkelVerify (message: Uint8Array | string, signature: Uint8Array | string, publicKey: Uint8Array | string): boolean {
  const messageU8a = u8aToU8a(message);
  const signatureU8a = u8aToU8a(signature);
  const publicKeyU8a = u8aToU8a(publicKey);

  return sr25519Verify(signatureU8a, messageU8a, publicKeyU8a);
}
