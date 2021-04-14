// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { assert } from '@polkadot/util';

import { BASE58_ALPHABET } from './bs58';

interface CheckConfig {
  alphabet: string;
  ipfsChar: string;
  type: string;
}

const BASE_CONFIG = { alphabet: BASE58_ALPHABET, ipfsChar: 'z', type: 'base58' };

export function validateChars ({ alphabet, ipfsChar, type }: CheckConfig, value?: string | null, ipfsCompat?: boolean): true {
  assert(value, `Expected non-null, non-empty ${type} input`);
  assert(!ipfsCompat || value[0] === ipfsChar, `Expected ${type} to start with '${ipfsChar}'`);

  for (let i = (ipfsCompat ? 1 : 0); i < value.length; i++) {
    assert(alphabet.includes(value[i]), `Invalid ${type} character "${value[i]}" (0x${value.charCodeAt(i).toString(16)}) at index ${i}`);
  }

  return true;
}

/**
 * @name base58Validate
 * @summary Validates a base58 value.
 * @description
 * Validates that the supplied value is valid base58
 */
export function base58Validate (value?: string | null, ipfsCompat?: boolean): value is string {
  return validateChars(BASE_CONFIG, value, ipfsCompat);
}
