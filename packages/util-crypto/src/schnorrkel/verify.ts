// Copyright 2017-2019 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import './polyfill';
import schnorrkel from '@polkadot/schnorrkel-js';

/**
 * @name schnorrkelVerify
 * @description Verifies the signature of `message`, using the supplied pair
 */
export default function schnorrkelVerify (message: Uint8Array, signature: Uint8Array, publicKey: Uint8Array): boolean {
  return schnorrkel.verify(signature, message, publicKey);
}
