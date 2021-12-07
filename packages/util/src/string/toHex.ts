// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AnyString, HexString } from '../types';

import { u8aToHex } from '../u8a/toHex';
import { stringToU8a } from './toU8a';

/**
 * @name stringToHex
 * @summary Creates a hex string from a utf-8 string
 * @description
 * String input values return the actual encoded hex value.
 * @example
 * <BR>
 *
 * ```javascript
 * import { stringToHex } from '@polkadot/util';
 *
 * stringToU8a('hello'); // 0x68656c6c6f
 * ```
 */
export function stringToHex (value?: AnyString): HexString {
  return u8aToHex(
    stringToU8a(value)
  );
}
