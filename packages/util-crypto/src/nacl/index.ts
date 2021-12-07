// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @summary Implements [NaCl](http://nacl.cr.yp.to/) secret-key authenticated encryption, public-key authenticated encryption
 */
export { naclDecrypt } from './decrypt';
export { naclEncrypt } from './encrypt';
export { naclBoxPairFromSecret } from './box/fromSecret';
export { naclOpen } from './open';
export { naclSeal } from './seal';
