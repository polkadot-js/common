// Copyright 2017-2022 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AnyString, U8aLike } from '../types';

import { u8aToU8a } from '../u8a/toU8a';
import { isHex } from './hex';
import { isString } from './string';

const invalid = new Array<boolean>(256);

for (let i = 0; i < 256; i++) {
  if (i < 32 || i >= 127) {
    invalid[i] = true;
  }
}

/** @internal */
function isAsciiStr (str: AnyString): boolean {
  const count = str.length;

  for (let i = 0; i < count; i++) {
    const b = str.charCodeAt(i);

    // check is inlined here, it is faster than making a call
    if ((b >= 127) || (b < 32)) {
      return false;
    }
  }

  return true;
}

/** @internal */
function isAsciiBytes (u8a: Uint8Array | Buffer | number[]): boolean {
  const count = u8a.length;

  for (let i = 0; i < count; i++) {
    const b = u8a[i];

    // check is inlined here, it is faster than making a call
    if ((b >= 127) || (b < 32)) {
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
