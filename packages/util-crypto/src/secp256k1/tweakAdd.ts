// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import BN from 'bn.js';

import { assert, bnToU8a, isU8a } from '@polkadot/util';

import { secp256k1 } from './secp256k1';

const ecparams = secp256k1.curve as { n: BN };

export function secp256k1PrivateKeyTweakAdd (seckey: Uint8Array, tweak: Uint8Array): Uint8Array {
  assert(isU8a(seckey) && seckey.length === 32, 'Expected seckey to be an Uint8Array with length 32');
  assert(isU8a(tweak) && tweak.length === 32, 'Expected tweak to be an Uint8Array with length 32');

  const bn = new BN(tweak);

  assert(bn.cmp(ecparams.n) < 0, 'Tweak parameter is out of range');

  bn.iadd(new BN(seckey));

  if (bn.cmp(ecparams.n) >= 0) {
    bn.isub(ecparams.n);
  }

  assert(!bn.isZero(), 'Invalid resulting private key');

  return bnToU8a(bn, { bitLength: 256, isLe: false });
}
