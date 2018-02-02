// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { KeypairType } from '../types';

// const nacl = require('tweetnacl');
const naclKeypairFromSeed = require('./keypairFromSeed');

/**
  @name naclKeypairFromSecret
  @signature naclKeypairFromSecret (secret: Uint8Array | string): { secretKey: Uint8Array, publicKey: Uint8Array }
  @summary Creates a new public/secret keypair from a secret.
  @description
    Returns a object containing a `publicKey` & `secretKey` generated from the supplied secret.
  @example
    import { naclKeypairFromSecret } from '@polkadot/util-crypto';

    naclKeypairFromSecret(...) // => { secretKey: [...], publicKey: [...] }
*/
module.exports = function naclKeypairFromSecret (secret: Uint8Array | string): KeypairType {
  // NOTE: According to the Rust implementation, this is equivalent to the seed version
  return naclKeypairFromSeed(secret);
  // return nacl.sign.keyPair.fromSecretKey(secretKey);
};
