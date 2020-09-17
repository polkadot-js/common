// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @summary Implements [NaCl](http://nacl.cr.yp.to/) secret-key authenticated encryption, public-key authenticated encryption, hashing, and public-key signatures
 */
export { default as naclDecrypt } from './decrypt';
export { default as deriveHard } from './deriveHard';
export { default as naclEncrypt } from './encrypt';
export { default as naclKeypairFromRandom } from './keypair/fromRandom';
export { default as naclKeypairFromSecret } from './keypair/fromSecret';
export { default as naclKeypairFromSeed } from './keypair/fromSeed';
export { default as naclKeypairFromString } from './keypair/fromString';
export { default as naclSign } from './sign';
export { default as naclVerify } from './verify';
export { default as naclBoxKeypairFromSecret } from './box/fromSecret';
export { default as naclOpen } from './open';
export { default as naclSeal } from './seal';
