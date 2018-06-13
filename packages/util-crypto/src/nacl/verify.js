// Copyright 2017-2018 @polkadot/util-crypto authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const nacl = require('tweetnacl');

/**
  @name naclSign
  @signature naclVerify (message: Uint8Array, signature: Uint8Array, publicKey: Uint8Array): boolean
  @summary Verifies the signature on the supplied message.
  @description
    Verifies the `signature` on `message` with the supplied `plublicKey`. Returns `true` on sucess, `false` otherwise.
  @example
    import { naclVerify } from '@polkadot/util-crypto';

    naclVerify([...], [...], [...]) // => true/false
*/
module.exports = function naclVerify (message: Uint8Array, signature: Uint8Array, publicKey: Uint8Array): boolean {
  return nacl.sign.detached.verify(message, signature, publicKey);
};
