// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import BN from 'bn.js';
import { ec as EC } from 'elliptic';

import { assert, isU8a } from '@polkadot/util';

const ec = new EC('secp256k1');
const ecparams = ec.curve as {n: BN};

const errors = {
  PUBKEY_PARSE: 'Public Key could not be parsed',
  TWEAK_ADD: 'The tweak was out of range or the resulted private key is invalid'
};

// Private key

export function secp256k1PrivateKeyTweakAdd (seckey: Uint8Array, tweak: Uint8Array): Uint8Array {
  assert(isU8a(seckey) && seckey.length === 32, 'Expected seckey to be an Uint8Array with length 32');
  assert(isU8a(tweak) && tweak.length === 32, 'Expected tweak to be an Uint8Array with length 32');

  switch (_secp256k1PrivateKeyTweakAdd(seckey, tweak)) {
    case 0:
      return seckey;
    case 1:
      throw new Error(errors.TWEAK_ADD);
  }

  return seckey;
}

function _secp256k1PrivateKeyTweakAdd (seckey: Uint8Array, tweak: Uint8Array): number {
  const bn = new BN(tweak);

  if (bn.cmp(ecparams.n) >= 0) return 1;

  bn.iadd(new BN(seckey));
  if (bn.cmp(ecparams.n) >= 0) bn.isub(ecparams.n);
  if (bn.isZero()) return 1;
  const tweaked = bn.toArrayLike(Buffer, 'be', 32);

  seckey.set(tweaked);

  return 0;
}
