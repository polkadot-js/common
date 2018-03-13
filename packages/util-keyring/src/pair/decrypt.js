// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { KeyringPairEncrypted } from '../types';

const naclDecrypt = require('@polkadot/util-crypto/nacl/decrypt');
const assert = require('@polkadot/util/assert');

const secretRounds = require('./secretRounds');

module.exports = function decrypt ({ crypto: { params: { nonce }, kdf: { rounds, salt }, text } }: KeyringPairEncrypted, _secret: string): Uint8Array {
  const secret = secretRounds(_secret, rounds, salt);
  const secretKey = naclDecrypt(text, secret, nonce);

  assert(secretKey, 'Unable to decrypt pair using secret');

  // $FlowFixMe checking for type just above
  return ((secretKey: any): Uint8Array);
};
