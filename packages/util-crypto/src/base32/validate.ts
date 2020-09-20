// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { validateChars } from '../base58/validate';
import { BASE32_ALPHABET } from './bs32';

/**
 * @name base32Validate
 * @summary Validates a base32 value.
 * @description
 * Validates the the supplied value is valid base32
 */
export default function base32Validate (value?: string | null, ipfsCompat = false): true {
  return validateChars('base32', BASE32_ALPHABET, value, ipfsCompat ? 'b' : undefined);
}
