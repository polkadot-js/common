// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const nacl = require('tweetnacl');

/**
  @name sha512AsU8a
  @signature sha512AsU8a (data: Uint8Array): Uint8Array
  @summary Creates sha-512 hash of the input.
  @description
    Returns a sha-512 `Uint8Array` from the supplied data.
  @example
    import { sha512AsU8a } from '@polkadot/util-crypto';

    sha512AsU8a(Uint8Array.from([...])) // => Uint8Array([...])
*/
module.exports = function sha512AsU8a (data: Uint8Array): Uint8Array {
  return nacl.hash(data);
};
