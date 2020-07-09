// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { u8aToBuffer, u8aToU8a } from '@polkadot/util';

/**
 * @name base64Encode
 * @summary Creates a base64 value.
 * @description
 * From the provided input, create the base64 and return the result as a string.
 */
export default function base58Encode (value: Uint8Array | string | Buffer | number[]): string {
  return u8aToBuffer(u8aToU8a(value)).toString('base64');
}
