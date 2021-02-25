// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import base64 from 'base64-js';

import { base64Validate } from './validate';

/**
 * @name base64Decode
 * @summary Decodes a base64 value.
 * @description
 * From the provided input, decode the base64 and return the result as an `Uint8Array`.
 */
export function base64Decode (value: string): Uint8Array {
  base64Validate(value);

  return base64.toByteArray(value);
}
