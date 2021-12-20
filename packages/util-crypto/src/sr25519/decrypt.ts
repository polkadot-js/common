// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@polkadot/util/types';
import type { Keypair } from '../types';

import { u8aToU8a } from '@polkadot/util';

import { naclDecrypt } from '../nacl';
import { buildSR25519EncryptionKey } from './encrypt';

interface sr25519EncryptedMessage {
  ephemeralPublicKey: Uint8Array;
  nonce: Uint8Array;
  sealed: Uint8Array;
}

/**
 * @name sr25519Decrypt
 * @description Returns decrypted message of `encryptedMessage`, using the supplied pair
 */
export function sr25519Decrypt (encryptedMessage: HexString | Uint8Array | string, { secretKey }: Partial<Keypair>): Uint8Array | null {
  const decapsulatedEncryptedMessage = sr25519DecapsulateEncryptedMessage(u8aToU8a(encryptedMessage));
  const encryptionKey = buildSR25519EncryptionKey(decapsulatedEncryptedMessage.ephemeralPublicKey, u8aToU8a(secretKey), decapsulatedEncryptedMessage.ephemeralPublicKey);

  return naclDecrypt(decapsulatedEncryptedMessage.sealed, decapsulatedEncryptedMessage.nonce, encryptionKey);
}

/**
 * @name sr25519DecapsulateEncryptedMessage
 * @description Split raw encrypted message
 */
function sr25519DecapsulateEncryptedMessage (encryptedMessage: Uint8Array): sr25519EncryptedMessage {
  return {
    ephemeralPublicKey: encryptedMessage.slice(24, 24 + 32),
    nonce: encryptedMessage.slice(0, 24),
    sealed: encryptedMessage.slice(24 + 32)
  };
}
