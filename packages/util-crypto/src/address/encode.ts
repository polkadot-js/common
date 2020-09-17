// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Prefix } from './types';

// Original implementation: https://github.com/paritytech/polka-ui/blob/4858c094684769080f5811f32b081dd7780b0880/src/polkadot.js#L34

import { assert, u8aConcat } from '@polkadot/util';

import base58Encode from '../base58/encode';
import decode from './decode';
import defaults from './defaults';
import sshash from './sshash';

export default function encode (_key: Uint8Array | string, ss58Format: Prefix = defaults.prefix): string {
  // decode it, this means we can re-encode an address
  const key = decode(_key);

  assert(defaults.allowedDecodedLengths.includes(key.length), `Expected a valid key to convert, with length ${defaults.allowedDecodedLengths.join(', ')}`);

  const isPublicKey = [32, 33].includes(key.length);
  const input = u8aConcat(new Uint8Array([ss58Format]), key);
  const hash = sshash(input);

  return base58Encode(
    u8aConcat(input, hash.subarray(0, isPublicKey ? 2 : 1))
  );
}
