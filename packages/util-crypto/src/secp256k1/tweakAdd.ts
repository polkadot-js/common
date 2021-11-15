// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { assert, BN, bnToU8a, isU8a } from '@polkadot/util';

import { BN_BE_256_OPTS } from '../bn';

// pre-defined curve param
const N = new BN('fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141', 'hex');

export function secp256k1PrivateKeyTweakAdd (seckey: Uint8Array, tweak: Uint8Array): Uint8Array {
  assert(isU8a(seckey) && seckey.length === 32, 'Expected seckey to be an Uint8Array with length 32');
  assert(isU8a(tweak) && tweak.length === 32, 'Expected tweak to be an Uint8Array with length 32');

  const bn = new BN(tweak);

  assert(bn.cmp(N) < 0, 'Tweak parameter is out of range');

  bn.iadd(new BN(seckey));

  if (bn.cmp(N) >= 0) {
    bn.isub(N);
  }

  assert(!bn.isZero(), 'Invalid resulting private key');

  return bnToU8a(bn, BN_BE_256_OPTS);
}
