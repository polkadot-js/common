// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@polkadot/util/types';

import base64 from 'base64-js';

import { u8aToU8a } from '@polkadot/util';

/**
 * @name base64Encode
 * @summary Creates a base64 value.
 * @description
 * From the provided input, create the base64 and return the result as a string.
 */
export function base64Encode (value: HexString | Uint8Array | string | Buffer | number[]): string {
  return base64.fromByteArray(u8aToU8a(value));
}
