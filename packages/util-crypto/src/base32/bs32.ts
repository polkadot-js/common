// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { utils } from 'micro-base';

import { createDecode, createEncode, createIs, createValidate } from './helpers';

const BASE32_ALPHABET = 'abcdefghijklmnopqrstuvwxyz234567';

// We define our own chain, the default base32 has padding
const base32 = utils.chain(
  utils.radix2(5),
  utils.alphabet(BASE32_ALPHABET),
  {
    decode: (input: string) => input.split(''),
    encode: (input: string[]) => input.join('')
  }
);

/**
 * @name base32Validate
 * @summary Validates a base32 value.
 * @description
 * Validates that the supplied value is valid base32, throwing exceptions if not
 */
export const base32Validate = createValidate({ alphabet: BASE32_ALPHABET, ipfsChar: 'b', type: 'base32' });

/**
* @name isBase32
* @description Checks if the input is in base32, returning true/false
*/
export const isBase32 = createIs(base32Validate);

/**
 * @name base32Decode
 * @summary Delookup a base32 value.
 * @description
 * From the provided input, decode the base32 and return the result as an `Uint8Array`.
 */
export const base32Decode = createDecode(base32, base32Validate);

/**
* @name base32Encode
* @summary Creates a base32 value.
* @description
* From the provided input, create the base32 and return the result as a string.
*/
export const base32Encode = createEncode(base32, 'b');
