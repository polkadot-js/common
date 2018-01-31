// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { KeypairType } from '../types';

const nacl = require('tweetnacl');

/**
  @name naclKeypair
  @signature naclKeypair (): { secretKey: Uint8Array, publicKey: Uint8Array }
  @summary Creates a new public/secret keypair.
  @description
    Returns a new generate object containing a `publicKey` & `secretKey`.
  @example
    import { naclKeypair } from '@polkadot/util-crypto';

    naclKeypair() // => { secretKey: [...], publicKey: [...] }
*/
module.exports = function naclKeypair (): KeypairType {
  return nacl.sign.keyPair();
};
