// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { createValidateFn } from '../base58/validate';
import { BASE32_ALPHABET } from './bs32';

/**
 * @name base32Validate
 * @summary Validates a base32 value.
 * @description
 * Validates that the supplied value is valid base32
 */
export const base32Validate = createValidateFn({ alphabet: BASE32_ALPHABET, ipfsChar: 'b', type: 'base32' });
