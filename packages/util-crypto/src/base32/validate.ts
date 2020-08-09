// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { BASE32_ALPHABET } from './bs32';

/**
 * @name base32Validate
 * @summary Validates a base32 value.
 * @description
 * Validates the the supplied value is valid base32
 */
export default function base32Validate (value: string): true {
  for (let i = 0; i < value.length; i++) {
    if (!BASE32_ALPHABET.includes(value[i])) {
      throw new TypeError(`Invalid base32 character "${value[i]}" (0x${value.charCodeAt(i).toString(16)}) at index ${i}`);
    }
  }

  return true;
}
