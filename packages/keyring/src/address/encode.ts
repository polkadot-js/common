// Copyright 2017-2018 @polkadot/keyring authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

// Original implementation: https://github.com/paritytech/polka-ui/blob/4858c094684769080f5811f32b081dd7780b0880/src/polkadot.js#L34

import bs58 from 'bs58';

import assert from '@polkadot/util/assert';
import u8aConcat from '@polkadot/util/u8a/concat';
import u8aToBuffer from '@polkadot/util/u8a/toBuffer';
import u8aToU8a from '@polkadot/util/u8a/toU8a';
import blake2b from '@polkadot/util-crypto/blake2/asU8a';

const PREFIX = new Uint8Array([42]);

export default function encode (_publicKey: Uint8Array | string): string {
  const publicKey = u8aToU8a(_publicKey);

  assert(publicKey.length === 32, `Expected a valid publicKey to convert`);

  const input = u8aConcat(PREFIX, publicKey);
  const hash = blake2b(input, 512);

  return bs58.encode(
    u8aToBuffer(
      u8aConcat(input, hash.subarray(0, 2))
    )
  );
}
