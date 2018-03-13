// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const naclDecrypt = require('@polkadot/util-crypto/nacl/decrypt');
const assert = require('@polkadot/util/assert');

module.exports = function decrypt (encrypted: Uint8Array, secret: Uint8Array, nonce: Uint8Array): Uint8Array {
  const secretKey = naclDecrypt(encrypted, secret, nonce);

  assert(secretKey, 'Unable to decrypt pair using secret');

  // $FlowFixMe checking for type just above
  return ((secretKey: any): Uint8Array);
};
