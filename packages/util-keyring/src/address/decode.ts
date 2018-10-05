// Copyright 2017-2018 @polkadot/util-keyring authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

// Original implementation: https://github.com/paritytech/polka-ui/blob/4858c094684769080f5811f32b081dd7780b0880/src/polkadot.js#L6

import bs58 from 'bs58';

import assert from '@polkadot/util/assert';
import bufferToU8a from '@polkadot/util/buffer/toU8a';
import isHex from '@polkadot/util/is/hex';
import isU8a from '@polkadot/util/is/u8a';
import u8aToU8a from '@polkadot/util/u8a/toU8a';
import blake2b from '@polkadot/util-crypto/blake2/asU8a';

import defaults from './defaults';

export default function decode (encoded: string | Uint8Array): Uint8Array {
  if (isU8a(encoded) || isHex(encoded)) {
    return u8aToU8a(encoded);
  }

  const decoded = bufferToU8a(bs58.decode(encoded));
  const error = (message: string) =>
    `Decoding ${encoded}: ${message}`;

  assert(decoded[0] === defaults.prefix[0], error('Invalid decoded address prefix'));

  // 32 + (1 + 2) in original
  assert(defaults.allowedLengths.includes(decoded.length - 3), error('Invalid decoded address length'));

  // 33 in original
  const hash = blake2b(decoded.subarray(0, decoded.length - 2), 512);

  // 33 & 34 in original
  assert(decoded[decoded.length - 2] === hash[0] && decoded[decoded.length - 1] === hash[1], error(' Invalid decoded address checksum'));

  // 33 in original
  return decoded.slice(1, decoded.length - 2);
}
