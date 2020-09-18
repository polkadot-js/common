// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { BASE58_ALPHABET } from './bs58';

export function validateChars (type: string, alphabet: string, value: string): true {
  for (let i = 0; i < value.length; i++) {
    if (!alphabet.includes(value[i])) {
      throw new TypeError(`Invalid ${type} character "${value[i]}" (0x${value.charCodeAt(i).toString(16)}) at index ${i}`);
    }
  }

  return true;
}

/**
 * @name base58Validate
 * @summary Validates a base58 value.
 * @description
 * Validates the the supplied value is valid base58
 */
export default function base58Validate (value: string): true {
  return validateChars('base58', BASE58_ALPHABET, value);
}
