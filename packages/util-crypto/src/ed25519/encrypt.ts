// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@polkadot/util/types';

import { u8aConcat, u8aToU8a } from '@polkadot/util';

import { naclSeal } from '../nacl/seal';
import { Keypair } from '../types';
import { ed25519PairFromRandom } from './pair/fromRandom';
import { convertPublicKeyToCurve25519, convertSecretKeyToCurve25519 } from './convertKey';

/**
 * @name ed25519Encrypt
 * @description Returns encrypted message of `message`, using the supplied pair
 */
export function ed25519Encrypt (message: HexString | Uint8Array | string, receiverPublicKey: Uint8Array, senderKeyPair?: Keypair): Uint8Array {
  const messageKeyPair = senderKeyPair || ed25519PairFromRandom();
  const x25519PublicKey = convertPublicKeyToCurve25519(receiverPublicKey);
  const x25519SecretKey = convertSecretKeyToCurve25519(messageKeyPair.secretKey);
  const { nonce, sealed } = naclSeal(u8aToU8a(message), x25519SecretKey, x25519PublicKey);

  return u8aConcat(nonce, messageKeyPair.publicKey, sealed);
}
