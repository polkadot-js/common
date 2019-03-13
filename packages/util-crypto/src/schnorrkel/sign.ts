// Copyright 2017-2019 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Keypair } from '../types';

import { assert } from '@polkadot/util/index';

import schnorrkel from '@polkadot/schnorrkel-js';

/**
 * @name schnorrkelSign
 * @description Returns message signature of `message`, using the supplied pair
 */
export default function schnorrkelSign (message: Uint8Array, { publicKey, secretKey }: Partial<Keypair>): Uint8Array {
  assert(publicKey && publicKey.length === 32, 'Expected valid publicKey, 32-bytes');
  assert(secretKey && secretKey.length === 64, 'Expected valid secretKey, 64-bytes');

  return schnorrkel.sign(publicKey as Uint8Array, secretKey as Uint8Array, message);
}
