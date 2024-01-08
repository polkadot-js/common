// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AnyString, U8aLike } from '../types.js';

import { u8aToU8a } from '../u8a/toU8a.js';
import { isHex } from './hex.js';
import { isString } from './string.js';

/** @internal */
function isAsciiStr (str: AnyString): boolean {
  for (let i = 0, count = str.length; i < count; i++) {
    const b = str.charCodeAt(i);

    // check is inlined here, it is faster than making a call
    if (b < 32 || b > 126) {
      return false;
    }
  }

  return true;
}

/** @internal */
function isAsciiBytes (u8a: Uint8Array | number[]): boolean {
  for (let i = 0, count = u8a.length; i < count; i++) {
    const b = u8a[i] | 0;

    // check is inlined here, it is faster than making a call
    if (b < 32 || b > 126) {
      return false;
    }
  }

  return true;
}

/**
 * @name isAscii
 * @summary Tests if the input is printable ASCII
 * @description
 * Checks to see if the input string or Uint8Array is printable ASCII, 32-127 + formatters
 */
export function isAscii (value?: U8aLike | null): boolean {
  return isString(value)
    ? isHex(value)
      ? isAsciiBytes(u8aToU8a(value))
      : isAsciiStr(value)
    : value
      ? isAsciiBytes(value)
      : false;
}
