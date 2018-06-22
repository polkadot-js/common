// Copyright 2017-2018 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { KeypairType } from '../../types';

import nacl from 'tweetnacl';

/**
  @name naclKeypair
  @signature naclKeypairFromRandom (): { secretKey: Uint8Array, publicKey: Uint8Array }
  @summary Creates a new public/secret keypair.
  @description
    Returns a new generate object containing a `publicKey` & `secretKey`.
  @example
    import { naclKeypair } from '@polkadot/util-crypto';

    naclKeypair() // => { secretKey: [...], publicKey: [...] }
*/
export default function naclKeypairFromRandom (): KeypairType {
  return nacl.sign.keyPair();
}
