// Copyright 2017-2019 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { KeypairType } from '../../types';

import schnorrkel from '@polkadot/schnorrkel';

const SEC_LEN = 64;

/**
 * @name schnorrkelKeypairFromSeed
 * @description Returns a object containing a `publicKey` & `secretKey` generated from the supplied seed.
 */
export default function schnorrkelKeypairFromSeed (seed: Uint8Array): KeypairType {
  const full = schnorrkel.keypair_from_seed(seed);

  return {
    publicKey: full.slice(SEC_LEN),
    secretKey: full.slice(0, SEC_LEN)
  };
}
