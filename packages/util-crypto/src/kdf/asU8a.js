// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

type KdfU8a = {
  key: Uint8Array,
  rounds: number,
  salt: Uint8Array
};

const isU8a = require('@polkadot/util/is/u8a');
const u8aFromUtf8 = require('@polkadot/util/u8a/fromUtf8');

const blake2AsU8a = require('../blake2/asU8a');
const randomAsU8a = require('../random/asU8a');

/**
  @name kdfAsU8a
  @signature kdfAsU8a (secret: Uint8Array | string, rounds?: number, salt?: Uint8Array): { key: Uint8Array, rounds: number, salt: Uint8Array }
  @summary Create Uint8Array key based on inputs
  @description
    From either a `string` or a `Uint8Array` input, create a key with an optional (or random) salt based on the number of rounds with Blake2. Return return the result key as a `Uint8Array` in addition to the salt used and rounds employed.
  @example
    import { kdfAsU8a } from '@polkadot/util-crypto';

    kdfAsU8a('123') // => { key: Uint8Array, rounds: number, salt: Uint8Array }
*/
module.exports = function kdfAsU8a (secret: Uint8Array | string, _rounds: number = 16, salt: Uint8Array = randomAsU8a(32)): KdfU8a {
  const rounds = Math.max(1, _rounds);
  let key: Uint8Array = isU8a(secret)
    // flowlint-next-line unclear-type:off
    ? ((secret: any): Uint8Array)
    // flowlint-next-line unclear-type:off
    : u8aFromUtf8(((secret: any): string));

  for (let count = 0; count < rounds; count++) {
    key = blake2AsU8a(key, 256, salt);
  }

  return {
    key,
    rounds,
    salt
  };
};
