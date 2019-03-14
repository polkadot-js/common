// Copyright 2017-2019 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { stringToU8a, u8aConcat } from '@polkadot/util';

import blake2AsU8a from '../blake2/asU8a';
import DeriveJunction from './DeriveJunction';

const HDKD = stringToU8a('SchnorrRistrettoHDKD');

// FIXME This should pull in from schnorrkel and do the magic there
export default function keyHdkdSr25519 (seed: Uint8Array, { chainCode }: DeriveJunction): Uint8Array {
  return blake2AsU8a(
    u8aConcat(HDKD, seed, chainCode)
  );
}
