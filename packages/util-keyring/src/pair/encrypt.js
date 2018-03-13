// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { KeyringPairEncrypted } from '../types';

const naclEncrypt = require('@polkadot/util-crypto/nacl/encrypt');

module.exports = function encrypt (message: Uint8Array, secret: Uint8Array, publicKey: Uint8Array): KeyringPairEncrypted {
  const { encrypted, nonce } = naclEncrypt(message, secret);

  return {
    encrypted,
    nonce,
    publicKey
  };
};
