// Copyright 2017-2018 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { KeypairType } from '../../types';

const nacl = require('tweetnacl');

/**
  @name naclKeypairFromSeed
  @signature naclKeypairFromSeed (seed: Uint8Array): { secretKey: Uint8Array, publicKey: Uint8Array }
  @summary Creates a new public/secret keypair from a seed.
  @description
    Returns a object containing a `publicKey` & `secretKey` generated from the supplied seed.
  @example
    import { naclKeypairFromSeed } from '@polkadot/util-crypto';

    naclKeypairFromSeed(...) // => { secretKey: [...], publicKey: [...] }
*/
module.exports = function naclKeypairFromSeed (seed: Uint8Array): KeypairType {
  return nacl.sign.keyPair.fromSeed(seed);
};
