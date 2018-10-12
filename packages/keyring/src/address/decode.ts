// Copyright 2017-2018 @polkadot/keyring authors & contributors
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

export default function decode (encoded: string | Uint8Array): Uint8Array {
  if (isU8a(encoded) || isHex(encoded)) {
    return u8aToU8a(encoded);
  }

  const decoded = bufferToU8a(bs58.decode(encoded));
  const error = (message: string) =>
    `Decoding ${encoded}: ${message}`;

  assert(decoded[0] === 42, error('Invalid decoded address prefix'));
  assert(decoded.length === 32 + 1 + 2, error('Invalid decoded address length'));

  const hash = blake2b(decoded.subarray(0, 33), 512);

  assert(decoded[33] === hash[0] && decoded[34] === hash[1], error(' Invalid decoded address checksum'));

  return decoded.slice(1, 33);
}
