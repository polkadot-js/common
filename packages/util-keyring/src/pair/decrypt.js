// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { KeyringPairEncrypted } from '../types';

const kdf = require('@polkadot/util-crypto/kdf/asU8a');
const naclDecrypt = require('@polkadot/util-crypto/nacl/decrypt');
const assert = require('@polkadot/util/assert');

module.exports = function decrypt ({ crypto: { params: { nonce }, kdf: { rounds, salt }, text } }: KeyringPairEncrypted, secret: Uint8Array | string): Uint8Array {
  const { key } = kdf(secret, rounds, salt);
  const secretKey = naclDecrypt(text, key, nonce);

  assert(secretKey, 'Unable to decrypt pair using secret');

  // $FlowFixMe checking for type just above
  return ((secretKey: any): Uint8Array);
};
