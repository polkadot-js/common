// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const nacl = require('tweetnacl');

/**
  @name naclDecrypt
  @signature naclDecrypt (message: Uint8Array, secretKey: Uint8Array, nonce: Uint8Array): Uint8Array
  @summary Decrypts a message using the supplied secretKey and nonce
  @description
    Returns an decrypted message, using the `secretKey` and `nonce`.
  @example
    import { naclDecrypt } from '@polkadot/util-crypto';

    naclDecrypt([...], [...], [...]) // => [...]
*/
module.exports = function naclDecrypt (message: Uint8Array, secret: Uint8Array, nonce: Uint8Array): ?Uint8Array {
  return nacl.secretbox.open(message, nonce, secret);
};
