// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { base64 } from 'micro-base';

import { assert } from '@polkadot/util';

import { createDecode, createEncode, createIs } from '../base32/helpers';

// const BASE64_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

const BASE64_REGEX = /^(?:[A-Za-z0-9+/]{2}[A-Za-z0-9+/]{2})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;

/**
 * @name base64Validate
 * @summary Validates a base64 value.
 * @description
 * Validates that the supplied value is valid base64
 */
export function base64Validate (value?: unknown): value is string {
  assert(value && typeof value === 'string', 'Expected non-null, non-empty base64 string input');
  assert(BASE64_REGEX.test(value), 'Invalid base64 encoding');

  return true;
}

/**
 * @name isBase64
 * @description Checks if the input is in base64, returning true/false
 */
export const isBase64 = createIs(base64Validate);

/**
 * @name base64Decode
 * @summary Decodes a base64 value.
 * @description
 * From the provided input, decode the base64 and return the result as an `Uint8Array`.
 */
export const base64Decode = createDecode(base64, base64Validate);

/**
 * @name base64Encode
 * @summary Creates a base64 value.
 * @description
 * From the provided input, create the base64 and return the result as a string.
 */
export const base64Encode = createEncode(base64);
