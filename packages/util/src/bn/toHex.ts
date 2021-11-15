// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString, ToBn, ToBnOptions } from '../types';
import type { BN } from './bn';

import { isNumber } from '../is/number';
import { objectSpread } from '../object/spread';
import { u8aToHex } from '../u8a';
import { bnToU8a } from './toU8a';

interface Options extends ToBnOptions {
  bitLength?: number;
}

const ZERO_STR = '0x00';
const DEFAULT_OPTS: Options = { bitLength: -1, isLe: false, isNegative: false };

/**
 * @name bnToHex
 * @summary Creates a hex value from a BN.js bignumber object.
 * @description
 * `null` inputs returns a `0x` result, BN values return the actual value as a `0x` prefixed hex value. Anything that is not a BN object throws an error. With `bitLength` set, it fixes the number to the specified length.
 * @example
 * <BR>
 *
 * ```javascript
 * import BN from 'bn.js';
 * import { bnToHex } from '@polkadot/util';
 *
 * bnToHex(new BN(0x123456)); // => '0x123456'
 * ```
 */
function bnToHex <ExtToBn extends ToBn> (value?: ExtToBn | BN | bigint | number | null, options?: Options): HexString;
function bnToHex <ExtToBn extends ToBn> (value?: ExtToBn | BN | bigint | number | null, bitLength?: number, isLe?: boolean): HexString;
function bnToHex <ExtToBn extends ToBn> (value?: ExtToBn | BN | bigint | number | null, arg1: number | Options = DEFAULT_OPTS, arg2?: boolean): HexString {
  if (!value) {
    return ZERO_STR;
  }

  return u8aToHex(
    bnToU8a(value, objectSpread(
      // We spread here, the default for hex values is BE (JSONRPC via substrate)
      { isLe: false, isNegative: false },
      isNumber(arg1)
        ? { bitLength: arg1, isLe: arg2 }
        : arg1
    ))
  );
}

export { bnToHex };
