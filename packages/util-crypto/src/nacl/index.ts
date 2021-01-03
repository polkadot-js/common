// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @summary Implements [NaCl](http://nacl.cr.yp.to/) secret-key authenticated encryption, public-key authenticated encryption, hashing, and public-key signatures
 */
export { naclDecrypt } from './decrypt';
export { naclEncrypt } from './encrypt';
export { naclKeypairFromRandom } from './keypair/fromRandom';
export { naclKeypairFromSecret } from './keypair/fromSecret';
export { naclKeypairFromSeed } from './keypair/fromSeed';
export { naclKeypairFromString } from './keypair/fromString';
export { naclSign } from './sign';
export { naclVerify } from './verify';
export { naclBoxKeypairFromSecret } from './box/fromSecret';
export { naclOpen } from './open';
export { naclSeal } from './seal';
