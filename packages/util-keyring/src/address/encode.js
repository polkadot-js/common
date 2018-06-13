// Copyright 2017-2018 @polkadot/util-keyring authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

// Original implementation: https://github.com/paritytech/polka-ui/blob/4858c094684769080f5811f32b081dd7780b0880/src/polkadot.js#L34

const bs58 = require('bs58');
const assert = require('@polkadot/util/assert');
const u8aConcat = require('@polkadot/util/u8a/concat');
const u8aToBuffer = require('@polkadot/util/u8a/toBuffer');
const u8aToU8a = require('@polkadot/util/u8a/toU8a');
const blake2b = require('@polkadot/util-crypto/blake2/asU8a');

const PREFIX = new Uint8Array([42]);

module.exports = function encode (_publicKey: Uint8Array | string): string {
  const publicKey = u8aToU8a(_publicKey);

  assert(publicKey.length === 32, `Expected a valid publicKey to convert`);

  const input = u8aConcat(PREFIX, publicKey);
  const hash = blake2b(input, 512);

  return bs58.encode(
    u8aToBuffer(
      u8aConcat(input, hash.subarray(0, 2))
    )
  );
};
