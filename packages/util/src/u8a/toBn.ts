// Copyright 2017-2022 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ToBnOptions } from '../types';

import { BN } from '../bn/bn';
import { isBoolean } from '../is/boolean';
import { objectSpread } from '../object/spread';

/**
 * @name u8aToBn
 * @summary Creates a BN from a Uint8Array object.
 * @description
 * `UInt8Array` input values return the actual BN. `null` or `undefined` values returns an `0x0` value.
 * @param value The value to convert
 * @param options Options to pass while converting
 * @param options.isLe Convert using Little Endian (default)
 * @param options.isNegative Convert using two's complement
 * @example
 * <BR>
 *
 * ```javascript
 * import { u8aToBn } from '@polkadot/util';
 *
 * u8aToHex(new Uint8Array([0x68, 0x65, 0x6c, 0x6c, 0xf])); // 0x68656c0f
 * ```
 */
function u8aToBn (value: Uint8Array, options?: ToBnOptions): BN;
/** @deprecated Use u8aToBn(value: Uint8Array, options?: ToBnOptions) */
function u8aToBn (value: Uint8Array, options?: boolean): BN;
/** @deprecated Use hexToBn (value?: string | null, options?: ToBnOptions) */
function u8aToBn (value: Uint8Array, options: ToBnOptions | boolean = {}): BN {
  // NOTE: This is the same process as followed in the hexToBn conversion
  // For Uint8Array, default to LE
  const { isLe, isNegative } = objectSpread<ToBnOptions>(
    { isLe: true, isNegative: false },
    isBoolean(options)
      ? { isLe: options }
      : options
  );
  const count = value.length;
  let bn: BN;

  // shortcut for <= u48 values - in this case the manual conversion
  // here seems to be more efficient than passing the full array
  // (and yes, it can be u48, e.g. in compacts with variable lengths)
  if (count <= 6) {
    let result = 0;

    for (let i = 0; i < count; i++) {
      result = (result * 0x1_00) + (
        isLe
          ? value[count - 1 - i]
          : value[i]
      );
    }

    bn = new BN(result);
  } else {
    bn = new BN(value, isLe ? 'le' : 'be');
  }

  return isNegative && value.length
    ? bn.fromTwos(value.length * 8)
    : bn;
}

export { u8aToBn };
