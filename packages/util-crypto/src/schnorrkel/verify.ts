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
export default function schnorrkelVerify (_message: Uint8Array | string, _signature: Uint8Array | string, _publicKey: Uint8Array | string): boolean {
  const message = u8aToU8a(_message);
  const signature = u8aToU8a(_signature);
  const publicKey = u8aToU8a(_publicKey);

  return sr25519Verify(signature, message, publicKey);
}
