// Copyright 2017-2018 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { KeypairType } from '../../types';

import nacl from 'tweetnacl';

/**
  @name naclKeypairFromSecret
  @signature naclKeypairFromSecret (secret: Uint8Array): { secretKey: Uint8Array, publicKey: Uint8Array }
  @summary Creates a new public/secret keypair from a secret.
  @description
    Returns a object containing a `publicKey` & `secretKey` generated from the supplied secret.
  @example
    import { naclKeypairFromSecret } from '@polkadot/util-crypto';

    naclKeypairFromSecret(...) // => { secretKey: [...], publicKey: [...] }
*/
export default function naclKeypairFromSecret (secret: Uint8Array): KeypairType {
  return nacl.sign.keyPair.fromSecretKey(secret);
}
