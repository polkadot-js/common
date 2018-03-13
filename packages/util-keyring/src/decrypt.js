// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { KeyringPairEncrypted, KeyringPair } from './types';

const naclKeypairFromString = require('@polkadot/util-crypto/nacl/keypair/fromString');

const createPair = require('./pair');

module.exports = function decrypt (box: KeyringPairEncrypted, secret: string): KeyringPair {
  const { secretKey } = naclKeypairFromString(secret);
  const pair = createPair({
    publicKey: box.publicKey,
    secretKey: new Uint8Array([])
  });

  pair.decryptSelf(box, secretKey);

  return pair;
};
