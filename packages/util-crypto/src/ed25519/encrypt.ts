// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@polkadot/util/types';

import { u8aConcat, u8aToU8a } from '@polkadot/util';

import { naclSeal } from '../nacl/seal';
import { ed25519PairFromRandom } from './pair/fromRandom';
import { convertPublicKeyToCurve25519, convertSecretKeyToCurve25519 } from './convertKey';

/**
 * @name ed25519Encrypt
 * @description Returns encrypted message of `message`, using the supplied pair
 */
export function ed25519Encrypt (message: HexString | Uint8Array | string, publicKey: Uint8Array): Uint8Array {
  const ephemeralKeyPair = ed25519PairFromRandom();
  const x25519PublicKey = convertPublicKeyToCurve25519(publicKey);
  const x25519SecretKey = convertSecretKeyToCurve25519(ephemeralKeyPair.secretKey);
  const { nonce, sealed } = naclSeal(u8aToU8a(message), x25519SecretKey, x25519PublicKey);

  return u8aConcat(nonce, ephemeralKeyPair.publicKey, sealed);
}
