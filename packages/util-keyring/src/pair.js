// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { KeypairType } from '@polkadot/util-crypto/types';
import type { KeyringPair } from './types';

const naclSign = require('@polkadot/util-crypto/nacl/sign');
const naclVerify = require('@polkadot/util-crypto/nacl/verify');
const u8aToString = require('@polkadot/util/u8a/toString');

module.exports = function pair ({ publicKey, secretKey }: KeypairType): KeyringPair {
  return {
    id: u8aToString(publicKey),
    publicKey,
    sign: (message: Uint8Array): Uint8Array =>
      naclSign(message, secretKey),
    verify: (message: Uint8Array, signature: Uint8Array): boolean =>
      naclVerify(message, signature, publicKey)
  };
};
