// Copyright 2017-2018 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { KeypairType } from '../../types';

import stringToU8a from '@polkadot/util/string/toU8a';

import blake2AsU8a from '../../blake2/asU8a';
import fromSeed from './fromSeed';

/**
 * @name naclKeypairFromString
 * @signature naclKeypairFromString (value: string): { secretKey: Uint8Array, publicKey: Uint8Array }
 * @summary Creates a new public/secret keypair from a string.
 * @description
 * Returns a object containing a `publicKey` & `secretKey` generated from the supplied string. The string is hashed and the value used as the input seed.
 * @example
 *   import { naclKeypairFromString } from '@polkadot/util-crypto';
 *
 *   naclKeypairFromString('test') // => { secretKey: [...], publicKey: [...] }
 */
export default function naclKeypairFromString (value: string): KeypairType {
  return fromSeed(
    blake2AsU8a(
      stringToU8a(value),
      256
    )
  );
}
