// Copyright 2017-2025 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { EncryptedJsonEncoding } from '@polkadot/util-crypto/types';

import { u8aEq } from '@polkadot/util';
import { jsonDecryptData } from '@polkadot/util-crypto';

import { PAIR_DIV, PAIR_HDR, PUB_LENGTH, SEC_LENGTH, SEED_LENGTH, PAIR_HDR_V4, PAIR_DIV_V4, CRYPTO_TYPE_LENGTH, KEY_LENGTH_FIELD_SIZE } from './defaults.js';

const SEED_OFFSET = PAIR_HDR.length;

/**
 * Decode a 32-bit length from little-endian bytes
 */
function decodeLength(data: Uint8Array, offset: number): number {
  const view = new DataView(data.buffer, data.byteOffset + offset, 4);
  return view.getUint32(0, true); // true = little-endian
}

/**
 * Check if data uses Generation 4 format
 */
function isV4Format(decrypted: Uint8Array): boolean {
  if (decrypted.length < PAIR_HDR_V4.length) {
    return false;
  }
  const header = decrypted.subarray(0, PAIR_HDR_V4.length);
  return u8aEq(header, PAIR_HDR_V4);
}

/**
 * Decode a Generation 4 format pair (variable-length keys)
 */
function decodePairV4(decrypted: Uint8Array): { publicKey: Uint8Array; secretKey: Uint8Array } {
  const header = decrypted.subarray(0, PAIR_HDR_V4.length);

  if (!u8aEq(header, PAIR_HDR_V4)) {
    throw new Error('Invalid Generation 4 encoding header found in body');
  }

  let offset = PAIR_HDR_V4.length;

  // Skip crypto type (1 byte)
  offset += CRYPTO_TYPE_LENGTH;

  // Read secret key length (4 bytes)
  const secretKeyLength = decodeLength(decrypted, offset);
  offset += KEY_LENGTH_FIELD_SIZE;

  // Read secret key
  const secretKey = decrypted.subarray(offset, offset + secretKeyLength);
  offset += secretKeyLength;

  // Check divider
  const divider = decrypted.subarray(offset, offset + PAIR_DIV_V4.length);
  if (!u8aEq(divider, PAIR_DIV_V4)) {
    throw new Error('Invalid Generation 4 encoding divider found in body');
  }
  offset += PAIR_DIV_V4.length;

  // Read public key length (4 bytes)
  const publicKeyLength = decodeLength(decrypted, offset);
  offset += KEY_LENGTH_FIELD_SIZE;

  // Read public key
  const publicKey = decrypted.subarray(offset, offset + publicKeyLength);

  return {
    publicKey,
    secretKey
  };
}

/**
 * Decode a pair, taking into account the generation-specific formats and headers
 *
 * For divisor/headers, don't rely on the magic being static. These will
 * change between generations, aka with the long-awaited 4th generation
 * of the format. The external decode interface is the only way to use and decode these.
 **/
export function decodePair (passphrase?: string, encrypted?: Uint8Array | null, _encType?: EncryptedJsonEncoding | EncryptedJsonEncoding[]): { publicKey: Uint8Array; secretKey: Uint8Array } {
  const encType = Array.isArray(_encType) || _encType === undefined
    ? _encType
    : [_encType];
  const decrypted = jsonDecryptData(encrypted, passphrase, encType);

  // Check if this is Generation 4 format (variable-length keys)
  if (isV4Format(decrypted)) {
    return decodePairV4(decrypted);
  }

  // Handle generations 1-3 (fixed-length keys)
  const header = decrypted.subarray(0, PAIR_HDR.length);

  // check the start header (generations 1-3)
  if (!u8aEq(header, PAIR_HDR)) {
    throw new Error('Invalid encoding header found in body');
  }

  // setup for generation 3 format
  let secretKey = decrypted.subarray(SEED_OFFSET, SEED_OFFSET + SEC_LENGTH);
  let divOffset = SEED_OFFSET + SEC_LENGTH;
  let divider = decrypted.subarray(divOffset, divOffset + PAIR_DIV.length);

  // old-style (generation 1 & 2), we have the seed here
  if (!u8aEq(divider, PAIR_DIV)) {
    divOffset = SEED_OFFSET + SEED_LENGTH;
    secretKey = decrypted.subarray(SEED_OFFSET, divOffset);
    divider = decrypted.subarray(divOffset, divOffset + PAIR_DIV.length);

    // check the divisior at this point (already checked for generation 3)
    if (!u8aEq(divider, PAIR_DIV)) {
      throw new Error('Invalid encoding divider found in body');
    }
  }

  const pubOffset = divOffset + PAIR_DIV.length;
  const publicKey = decrypted.subarray(pubOffset, pubOffset + PUB_LENGTH);

  return {
    publicKey,
    secretKey
  };
}
