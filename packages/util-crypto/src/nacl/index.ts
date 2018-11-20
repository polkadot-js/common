// Copyright 2017-2018 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import naclDecrypt from './decrypt';
import naclEncrypt from './encrypt';
import naclKeypairFromRandom from './keypair/fromRandom';
import naclKeypairFromSecret from './keypair/fromSecret';
import naclKeypairFromSeed from './keypair/fromSeed';
import naclKeypairFromString from './keypair/fromString';
import naclSign from './sign';
import naclVerify from './verify';

/**
 * @summary Implements [NaCl](http://nacl.cr.yp.to/) secret-key authenticated encryption, public-key authenticated encryption, hashing, and public-key signatures
 */
export {
  naclDecrypt,
  naclEncrypt,
  naclKeypairFromRandom,
  naclKeypairFromSecret,
  naclKeypairFromSeed,
  naclKeypairFromString,
  naclSign,
  naclVerify
};
