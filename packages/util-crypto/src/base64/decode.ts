// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { bufferToU8a } from '@polkadot/util';

import validate from './validate';

/**
 * @name base64Decode
 * @summary Decodes a base64 value.
 * @description
 * From the provided input, decode the base64 and return the result as an `Uint8Array`.
 */
export default function base64Decode (value: string): Uint8Array {
  validate(value);

  return bufferToU8a(Buffer.from(value, 'base64'));
}
