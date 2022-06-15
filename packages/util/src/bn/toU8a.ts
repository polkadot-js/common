// Copyright 2017-2022 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { NumberOptions, ToBn } from '../types';
import type { BN } from './bn';

import { isNumber } from '../is/number';
import { bnToBn } from './toBn';

const DEFAULT_OPTS: NumberOptions = { bitLength: -1, isLe: true, isNegative: false };

/**
 * @name bnToU8a
 * @summary Creates a Uint8Array object from a BN.
 * @description
 * `null`/`undefined`/`NaN` inputs returns an empty `Uint8Array` result. `BN` input values return the actual bytes value converted to a `Uint8Array`. Optionally convert using little-endian format if `isLE` is set.
 * @example
 * <BR>
 *
 * ```javascript
 * import { bnToU8a } from '@polkadot/util';
 *
 * bnToU8a(new BN(0x1234)); // => [0x12, 0x34]
 * ```
 */
function bnToU8a <ExtToBn extends ToBn> (value?: ExtToBn | BN | bigint | number | null, options?: NumberOptions): Uint8Array;
/** @deprecated Use bnToU8a(value?: ExtToBn | BN | bigint | number | null, options?: NumberOptions) */
function bnToU8a <ExtToBn extends ToBn> (value?: ExtToBn | BN | bigint | number | null, bitLength?: number, isLe?: boolean): Uint8Array;
/** @deprecated Use bnToU8a(value?: ExtToBn | BN | bigint | number | null, options?: NumberOptions) */
function bnToU8a <ExtToBn extends ToBn> (value?: ExtToBn | BN | bigint | number | null, arg1: number | NumberOptions = DEFAULT_OPTS, arg2?: boolean): Uint8Array {
  const { bitLength = -1, isLe = true, isNegative = false } = isNumber(arg1)
    ? { bitLength: arg1, isLe: arg2 }
    : arg1;

  const valueBn = bnToBn(value);
  const byteLength = bitLength === -1
    ? Math.ceil(valueBn.bitLength() / 8)
    : Math.ceil((bitLength || 0) / 8);

  if (!value) {
    return bitLength === -1
      ? new Uint8Array()
      : new Uint8Array(byteLength);
  }

  const output = new Uint8Array(byteLength);
  const bn = isNegative
    ? valueBn.toTwos(byteLength * 8)
    : valueBn;

  output.set(bn.toArray(isLe ? 'le' : 'be', byteLength), 0);

  return output;
}

export { bnToU8a };
