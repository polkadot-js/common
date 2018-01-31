// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const nacl = require('tweetnacl');

/**
  @name naclSign
  @signature naclSign (message: Uint8Array, secretKey: Uint8Array): Uint8Array
  @summary Signs a message using the supplied secretKey
  @description
    Returns message signature of `message`, using the `secretKey`.
  @example
    import { naclSign } from '@polkadot/util-crypto';

    naclSign([...], [...]) // => [...]
*/
module.exports = function naclSign (message: Uint8Array, secretKey: Uint8Array): Uint8Array {
  // NOTE: Original message appended to the signature, slice result only
  return nacl.sign(message, secretKey).subarray(0, 64);
};
