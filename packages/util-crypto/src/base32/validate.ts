// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { validateChars } from '../base58/validate';
import { BASE32_ALPHABET } from './bs32';

/**
 * @name base32Validate
 * @summary Validates a base32 value.
 * @description
 * Validates the the supplied value is valid base32
 */
export default function base32Validate (value: string): true {
  return validateChars('base32', BASE32_ALPHABET, value);
}
