// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { KeyringPairEncrypted, KeyringPair } from './types';

const createPair = require('./pair');

module.exports = function decrypt (box: KeyringPairEncrypted, secret: Uint8Array | string): KeyringPair {
  const pair = createPair({
    publicKey: box.publicKey,
    secretKey: new Uint8Array([])
  });

  pair.decryptSelf(box, secret);

  return pair;
};
