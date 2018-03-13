// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { KeyringPairEncrypted } from '../types';

const naclEncrypt = require('@polkadot/util-crypto/nacl/encrypt');
const randomAsU8a = require('@polkadot/util-crypto/random/asU8a');

const secretRounds = require('./secretRounds');

module.exports = function encrypt (message: Uint8Array, _secret: string, publicKey: Uint8Array, rounds: number = 8): KeyringPairEncrypted {
  const salt = randomAsU8a(32);
  const secret = secretRounds(_secret, rounds, salt);
  const { encrypted, nonce } = naclEncrypt(message, secret);

  return {
    crypto: {
      cipher: 'xsalsa20-poly1305',
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
