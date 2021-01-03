// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { validateChars } from '../base58/validate';
import { BASE32_ALPHABET } from './bs32';

const BASE_CONFIG = { alphabet: BASE32_ALPHABET, ipfsChar: 'b', type: 'base32' };

/**
 * @name base32Validate
 * @summary Validates a base32 value.
 * @description
 * Validates the the supplied value is valid base32
 */
export function base32Validate (value?: string | null, ipfsCompat?: boolean): true {
  return validateChars(BASE_CONFIG, value, ipfsCompat);
}
