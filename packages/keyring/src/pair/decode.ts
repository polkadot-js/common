// Copyright 2017-2024 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { EncryptedJsonEncoding } from '@polkadot/util-crypto/types';

import { u8aEq } from '@polkadot/util';
import { jsonDecryptData } from '@polkadot/util-crypto';

import { PAIR_DIV, PAIR_HDR, PUB_LENGTH, SEC_LENGTH, SEED_LENGTH } from './defaults.js';

const SEED_OFFSET = PAIR_HDR.length;

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
