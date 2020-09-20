// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { assert } from '@polkadot/util';

import { BASE58_ALPHABET } from './bs58';

export function validateChars (type: string, alphabet: string, value?: string | null, startChar?: string): true {
  assert(value, `Expected non-null, non-empty ${type} input`);
  assert(!startChar || value[0] === startChar, `Expected ${type} to start with '${startChar || ''}'`);

  for (let i = (startChar ? 1 : 0); i < value.length; i++) {
    assert(alphabet.includes(value[i]), `Invalid ${type} character "${value[i]}" (0x${value.charCodeAt(i).toString(16)}) at index ${i}`);
  }

  return true;
}

/**
 * @name base58Validate
 * @summary Validates a base58 value.
 * @description
 * Validates the the supplied value is valid base58
 */
export default function base58Validate (value?: string | null, ipfsCompat = false): true {
  return validateChars('base58', BASE58_ALPHABET, value, ipfsCompat ? 'z' : undefined);
}
