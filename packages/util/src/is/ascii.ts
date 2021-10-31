// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { U8aLike } from '../types';

import { u8aToU8a } from '../u8a/toU8a';
import { isHex } from './hex';
import { isString } from './string';

const FORMAT = [9, 10, 13];

/** @internal */
function getCharCode0 (s: string): number {
  return s.charCodeAt(0);
}

/** @internal */
function isAsciiByte (b: number): boolean {
  return (b < 127) && (
    (b >= 32) ||
    FORMAT.includes(b)
  );
}

/**
 * @name isAscii
 * @summary Tests if the input is printable ASCII
 * @description
 * Checks to see if the input string or Uint8Array is printable ASCII, 32-127 + formatters
 */
export function isAscii (value?: U8aLike | null): boolean {
  const isStringIn = isString(value);

  if (value) {
    return (
      isStringIn && !isHex(value)
        ? value.toString().split('').map(getCharCode0)
        : u8aToU8a(value)
    ).every(isAsciiByte);
  }

  return isStringIn;
}
