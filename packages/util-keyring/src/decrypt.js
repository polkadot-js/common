// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { KeyringPair } from './types';

const createPair = require('./pair');

module.exports = function decrypt (encoded: Uint8Array, passphrase: Uint8Array | string): KeyringPair {
  const pair = createPair({
    publicKey: new Uint8Array(32),
    secretKey: new Uint8Array(64)
  });

  pair.decodePkcs8(encoded, passphrase);

  return pair;
};
