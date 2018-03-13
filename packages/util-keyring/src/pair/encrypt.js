// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { KeyringPairEncrypted } from '../types';

const kdf = require('@polkadot/util-crypto/kdf/asU8a');
const naclEncrypt = require('@polkadot/util-crypto/nacl/encrypt');

module.exports = function encrypt (message: Uint8Array, secret: Uint8Array | string, publicKey: Uint8Array): KeyringPairEncrypted {
  const { key, rounds, salt } = kdf(secret);
  const { encrypted, nonce } = naclEncrypt(message, key);

  return {
    crypto: {
      params: {
        nonce
      },
      kdf: {
        rounds,
        salt
      },
      text: encrypted
    },
    publicKey
  };
};
