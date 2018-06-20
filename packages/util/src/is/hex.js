// Copyright 2017-2018 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import isString from './string';

const HEX_REGEX = /^0x[a-fA-F0-9]+$/;

/**
  @name isHex
  @signature isHex (value: mixed, bitLength: number = -1): boolean
  @summary Tests for a hex string.
  @description
    Checks to see if the input value is a `0x` prefixed hex string. Optionally (`bitLength` !== -1) checks to see if the bitLength is correct.
  @example
    import { isHex } from '@polkadot/util';

    isHex('0x1234'); // => true
    isHex('0x1234', 8); // => false
*/
export default function isHex (_value: mixed, bitLength: number = -1, ignoreLength: boolean = false): boolean {
  // flowlint-next-line unclear-type:off
  const value: string = (_value: any);
  const isValidHex = value === '0x' || (isString(value) && HEX_REGEX.test(value));

  if (isValidHex && bitLength !== -1) {
    return value.length === (2 + Math.ceil(bitLength / 4));
  }

  return isValidHex && (ignoreLength || (value.length % 2 === 0));
}
