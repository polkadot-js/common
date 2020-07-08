// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { BASE58_ALPHABET } from './bs58';

/**
 * @name base58Validate
 * @summary Validates a base58 value.
 * @description
 * Validates the the supplied value is valid base58
 */
export default function base58Validate (value: string): true {
  for (let i = 0; i < value.length; i++) {
    if (!BASE58_ALPHABET.includes(value[i])) {
      throw new TypeError(`Invalid base58 character "${value[i]}" (0x${value.charCodeAt(i).toString(16)}) at index ${i}`);
    }
  }

  return true;
}
