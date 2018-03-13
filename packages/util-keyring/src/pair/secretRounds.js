// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const blake2AsU8a256 = require('@polkadot/util-crypto/blake2/asU8a256');
const u8aFromUtf8 = require('@polkadot/util/u8a/fromUtf8');

module.exports = function secretRounds (_secret: string, rounds: number, salt: Uint8Array): Uint8Array {
  let secret = u8aFromUtf8(_secret);

  for (let count = 0; count < rounds; count++) {
    secret = blake2AsU8a256(secret, salt);
  }

  return secret;
};
