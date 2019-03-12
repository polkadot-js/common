// Copyright 2017-2019 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { stringToU8a, u8aConcat } from '@polkadot/util/index';

import blake2AsU8a from '../blake2/asU8a';

const HDKD = stringToU8a('Ed25519HDKD');

export default function keyHdkdEd25519 (seed: Uint8Array, cc: Uint8Array): Uint8Array {
  return blake2AsU8a(
    u8aConcat(HDKD, seed, cc)
  );
}
