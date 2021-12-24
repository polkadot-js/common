// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@polkadot/util/types';
import type { Keypair } from '../types';

import { assert, u8aCmp, u8aToU8a } from '@polkadot/util';

import { naclDecrypt } from '../nacl';
import { buildSR25519EncryptionKey, keyDerivationSaltSize, macData, nonceSize } from './encrypt';

const publicKeySize = 32;
const macValueSize = 32;

interface sr25519EncryptedMessage {
  ephemeralPublicKey: Uint8Array;
  keyDerivationSalt: Uint8Array;
  macValue: Uint8Array;
  nonce: Uint8Array;
  sealed: Uint8Array;
}

/**
 * @name sr25519Decrypt
 * @description Returns decrypted message of `encryptedMessage`, using the supplied pair
 */
export function sr25519Decrypt (encryptedMessage: HexString | Uint8Array | string, { secretKey }: Partial<Keypair>): Uint8Array | null {
  const { ephemeralPublicKey, keyDerivationSalt, macValue, nonce, sealed } = sr25519DecapsulateEncryptedMessage(u8aToU8a(encryptedMessage));
  const { encryptionKey, macKey } = buildSR25519EncryptionKey(ephemeralPublicKey,
    u8aToU8a(secretKey),
    ephemeralPublicKey,
    keyDerivationSalt);
  const decryptedMacValue = macData(nonce, sealed, ephemeralPublicKey, macKey);

  assert(u8aCmp(decryptedMacValue, macValue) === 0, "Mac values don't match");

  return naclDecrypt(sealed, nonce, encryptionKey);
}

/**
 * @name sr25519DecapsulateEncryptedMessage
 * @description Split raw encrypted message
 */
function sr25519DecapsulateEncryptedMessage (encryptedMessage: Uint8Array): sr25519EncryptedMessage {
  assert(encryptedMessage.byteLength > nonceSize + keyDerivationSaltSize + publicKeySize + macValueSize, 'Wrong encrypted message length');

  return {
    ephemeralPublicKey: encryptedMessage.slice(nonceSize + keyDerivationSaltSize, nonceSize + keyDerivationSaltSize + publicKeySize),
    keyDerivationSalt: encryptedMessage.slice(nonceSize, nonceSize + keyDerivationSaltSize),
    macValue: encryptedMessage.slice(nonceSize + keyDerivationSaltSize + publicKeySize, nonceSize + keyDerivationSaltSize + publicKeySize + macValueSize),
    nonce: encryptedMessage.slice(0, nonceSize),
    sealed: encryptedMessage.slice(nonceSize + keyDerivationSaltSize + publicKeySize + macValueSize)
  };
}
