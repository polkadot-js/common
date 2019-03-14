// Copyright 2017-2019 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { assert, compactAddLength, stringToU8a, u8aConcat } from '@polkadot/util';

import blake2AsU8a from '../blake2/asU8a';
import DeriveJunction from './DeriveJunction';

const HDKD = compactAddLength(stringToU8a('Ed25519HDKD'));

export default function keyHdkdEd25519 (seed: Uint8Array, { chainCode, isHard }: DeriveJunction): Uint8Array {
  assert(isHard, 'A soft key was found in the path (and is unsupported)');

  return blake2AsU8a(
    u8aConcat(HDKD, seed, chainCode)
  );
}
