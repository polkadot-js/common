// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { KeyringPair } from './types';

module.exports = function encrypt (pair: KeyringPair, passphrase: Uint8Array | string): Uint8Array {
  return pair.encodePkcs8(passphrase);
};
