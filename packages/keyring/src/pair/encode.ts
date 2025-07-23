// Copyright 2017-2025 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { PairInfo } from './types.js';
import type { KeypairType } from '@polkadot/util-crypto/types';

import { u8aConcat } from '@polkadot/util';
import { naclEncrypt, scryptEncode, scryptToU8a } from '@polkadot/util-crypto';

import { PAIR_DIV, PAIR_HDR, PAIR_HDR_V4, PAIR_DIV_V4, CRYPTO_TYPES } from './defaults.js';

/**
 * Encode a 32-bit length as little-endian bytes
 */
function encodeLength(length: number): Uint8Array {
  const buffer = new ArrayBuffer(4);
  const view = new DataView(buffer);
  view.setUint32(0, length, true); // true = little-endian
  return new Uint8Array(buffer);
}

/**
 * Determine crypto type from key lengths
 */
function determineCryptoType(publicKeyLength: number, secretKeyLength: number): number {
  // MLDSA has unique key sizes
  if (publicKeyLength === 2592 && secretKeyLength === 4896) {
    return CRYPTO_TYPES.mldsa;
  }
  // ed25519 standard sizes
  if (publicKeyLength === 32 && secretKeyLength === 64) {
    return CRYPTO_TYPES.ed25519;
  }
  // sr25519 has same sizes as ed25519 but different algorithm
  if (publicKeyLength === 32 && (secretKeyLength === 32 || secretKeyLength === 64)) {
    return CRYPTO_TYPES.sr25519;
  }
  // Default to ed25519 for backward compatibility
  return CRYPTO_TYPES.ed25519;
}

/**
 * Check if we need Generation 4 encoding (for variable-length keys)
 */
function needsV4Encoding(publicKey: Uint8Array, secretKey: Uint8Array): boolean {
  // Use V4 for non-standard key sizes (like MLDSA)
  return publicKey.length !== 32 || secretKey.length !== 64;
}

/**
 * Encode a pair with Generation 4 format (variable-length keys)
 */
export function encodePairV4({ publicKey, secretKey }: PairInfo, cryptoType?: KeypairType, passphrase?: string): Uint8Array {
  if (!secretKey) {
    throw new Error('Expected a valid secretKey to be passed to encode');
  }

  const cryptoTypeId = cryptoType ? CRYPTO_TYPES[cryptoType] : determineCryptoType(publicKey.length, secretKey.length);
  const cryptoTypeBytes = new Uint8Array([cryptoTypeId]);
  const secretLengthBytes = encodeLength(secretKey.length);
  const publicLengthBytes = encodeLength(publicKey.length);

  const encoded = u8aConcat(
    PAIR_HDR_V4,
    cryptoTypeBytes,
    secretLengthBytes,
    secretKey,
    PAIR_DIV_V4,
    publicLengthBytes,
    publicKey
  );

  if (!passphrase) {
    return encoded;
  }

  // Encrypt using the same method as generation 3
  const { params, password, salt } = scryptEncode(passphrase);
  const { encrypted, nonce } = naclEncrypt(encoded, password.subarray(0, 32));

  return u8aConcat(scryptToU8a(salt, params), nonce, encrypted);
}

/**
 * Encode a pair with the appropriate generation format
 **/
export function encodePair ({ publicKey, secretKey }: PairInfo, passphrase?: string, cryptoType?: KeypairType): Uint8Array {
  if (!secretKey) {
    throw new Error('Expected a valid secretKey to be passed to encode');
  }

  // Use Generation 4 encoding for variable-length keys (like MLDSA)
  if (needsV4Encoding(publicKey, secretKey)) {
    return encodePairV4({ publicKey, secretKey }, cryptoType, passphrase);
  }

  // Use Generation 3 encoding for standard-length keys (backward compatibility)
  const encoded = u8aConcat(PAIR_HDR, secretKey, PAIR_DIV, publicKey);

  if (!passphrase) {
    return encoded;
  }

  // this is only for generation 3 (previous generations are only handled in decoding)
  const { params, password, salt } = scryptEncode(passphrase);
  const { encrypted, nonce } = naclEncrypt(encoded, password.subarray(0, 32));

  return u8aConcat(scryptToU8a(salt, params), nonce, encrypted);
}
