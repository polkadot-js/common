// Copyright 2017-2018 @polkadot/keyring authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Prefix } from './types';

// Original implementation: https://github.com/paritytech/polka-ui/blob/4858c094684769080f5811f32b081dd7780b0880/src/polkadot.js#L34

import bs58 from 'bs58';

import assert from '@polkadot/util/assert';
import u8aConcat from '@polkadot/util/u8a/concat';
import u8aToBuffer from '@polkadot/util/u8a/toBuffer';
import u8aToU8a from '@polkadot/util/u8a/toU8a';
import blake2b from '@polkadot/util-crypto/blake2/asU8a';

import defaults from './defaults';

export default function encode (_key: Uint8Array | string, prefix: Prefix = defaults.prefix): string {
  const key = u8aToU8a(_key);

  assert(defaults.allowedInputLengths.includes(key.length), `Expected a valid key to convert, with length ${defaults.allowedInputLengths}`);

  const input = u8aConcat(new Uint8Array([prefix]), key);
  const hash = blake2b(input, 512);

  return bs58.encode(
    u8aToBuffer(
      u8aConcat(input, hash.subarray(0, key.length === 32 ? 2 : 1))
    )
  );
}
