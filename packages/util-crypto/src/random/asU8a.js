// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const nacl = require('tweetnacl');

/**
  @name randomAsU8a
  @signature randomAsU8a (length?: number = 32): Uint8Array
  @summary Creates a Uint8Array filled with random bytes.
  @description
    Returns a `Uint8Array` with the specified (optional) length filled with random bytes.
  @example
    import { randomAsU8a } from '@polkadot/util-crypto';

    randomAsU8s() // => Uint8Array([...])
*/
module.exports = function randomAsU8a (length?: number = 32): Uint8Array {
  return nacl.randomBytes(length);
};
