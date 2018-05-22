// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

// Original implementation: https://github.com/paritytech/polka-ui/blob/4858c094684769080f5811f32b081dd7780b0880/src/polkadot.js#L6

const bs58 = require('bs58');
const assert = require('@polkadot/util/assert');
const bufferToU8a = require('@polkadot/util/buffer/toU8a');
const isHex = require('@polkadot/util/is/hex');
const isU8a = require('@polkadot/util/is/u8a');
const u8aToU8a = require('@polkadot/util/u8a/toU8a');
const blake2b = require('@polkadot/util-crypto/blake2/asU8a');

module.exports = function decode (encoded: string | Uint8Array): Uint8Array {
  if (isU8a(encoded) || isHex(encoded)) {
    return u8aToU8a(encoded);
  }

  // flowlint-next-line unclear-type:off
  const decoded = bufferToU8a(bs58.decode(((encoded: any): string)));

  assert(decoded[0] === 42, 'Invalid decoded address prefix');
  assert(decoded.length === 32 + 1 + 2, 'Invalid decoded address length');

  const hash = blake2b(decoded.subarray(0, 33), 512);

  assert(decoded[33] === hash[0] && decoded[34] === hash[1], 'Invalid decoded address checksum');

  return decoded.slice(1, 33);
};
