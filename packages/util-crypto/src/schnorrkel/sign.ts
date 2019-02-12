// Copyright 2017-2019 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import './polyfill';

import { KeypairType } from '../types';

import schnorrkel from '@polkadot/schnorrkel';

/**
 * @name schnorrkelSign
 * @description Returns message signature of `message`, using the supplied pair
 */
export default function schnorrkelSign (message: Uint8Array, { publicKey, secretKey }: KeypairType): Uint8Array {
  return schnorrkel.sign(publicKey, secretKey, message);
}
