// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { KeyringPairEncrypted, KeyringPair } from './types';

const naclKeypairFromString = require('@polkadot/util-crypto/nacl/keypair/fromString');

module.exports = function encrypt (pair: ?KeyringPair, secret: string): ?KeyringPairEncrypted {
  if (!pair) {
    return null;
  }

  const { secretKey } = naclKeypairFromString(secret);

  return pair.encryptSelf(secretKey);
};
