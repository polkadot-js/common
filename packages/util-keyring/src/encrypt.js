// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { KeyringPairEncrypted, KeyringPair } from './types';

module.exports = function encrypt (pair: ?KeyringPair, secret: Uint8Array | string): ?KeyringPairEncrypted {
  if (!pair) {
    return null;
  }

  return pair.encryptSelf(secret);
};
