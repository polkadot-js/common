// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { KeypairType } from '../types';

const nacl = require('tweetnacl');

/**
  @name naclKeypairFromSecret
  @signature naclKeypairFromSecret (secretKey: Uint8Array): { secretKey: Uint8Array, publicKey: Uint8Array }
  @summary Creates a new public/secret keypair from a secret.
  @description
    Returns a object containing a `publicKey` & `secretKey` generated from the supplied secret.
  @example
    import { naclKeypairFromSecret } from '@polkadot/util-crypto';

    naclKeypairFromSecret(...) // => { secretKey: [...], publicKey: [...] }
*/
module.exports = function naclKeypairFromSecret (secretKey: Uint8Array): KeypairType {
  return nacl.sign.keyPair.fromSecretKey(secretKey);
};
