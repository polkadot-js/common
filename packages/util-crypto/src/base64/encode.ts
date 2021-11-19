// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { U8aLike } from '@polkadot/util/types';

import { u8aToU8a } from '@polkadot/util';

import { base64 } from './bs64';

/**
 * @name base64Encode
 * @summary Creates a base64 value.
 * @description
 * From the provided input, create the base64 and return the result as a string.
 */
export function base64Encode (value: U8aLike): string {
  return base64.encode(u8aToU8a(value));
}
