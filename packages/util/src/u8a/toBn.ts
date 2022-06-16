// Copyright 2017-2022 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ToBnOptions } from '../types';

import { BN } from '../bn/bn';
import { isBoolean } from '../is/boolean';

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
/** @deprecated Use u8aToBn (value?: string | null, options?: ToBnOptions) */
function u8aToBn (value: Uint8Array, options: ToBnOptions | boolean = {}): BN {
  // NOTE: This is the same process as followed in the hexToBn conversion
  // For Uint8Array, default to LE
  const { isLe = true, isNegative = false } = isBoolean(options)
    ? { isLe: options }
    : options;
  const count = value.length;

  // shortcut for <= u48 values - in this case the manual conversion
  // here seems to be more efficient than passing the full array
  if (count <= 6) {
    if (isNegative) {
      let result = 0;

      if (isLe) {
        // Most common case i{8, 16, 32} default LE SCALE-encoded
        // For <= 32, we also optimize the xor to a single op
        // (see the comments around unrolling in the next section)
        switch (count) {
          case 0:
            return new BN(0);

          case 1:
            result = value[0] ^ 0x0000_00ff;
            break;

          case 2:
            result = (value[0] + (value[1] * 0x1_00)) ^ 0x0000_ffff;
            break;

          case 3:
            result = (value[0] + (value[1] * 0x1_00) + (value[2] * 0x1_00_00)) ^ 0x00ff_ffff;
            break;

          case 4:
            result = (value[0] + (value[1] * 0x1_00) + (value[2] * 0x1_00_00) + (value[3] * 0x1_00_00_00)) ^ 0xffff_ffff;
            break;

          case 5:
            result = (value[0] ^ 0xff) + ((value[1] ^ 0xff) * 0x1_00) + ((value[2] ^ 0xff) * 0x1_00_00) + ((value[3] ^ 0xff) * 0x1_00_00_00) + ((value[4] ^ 0xff) * 0x1_00_00_00_00);
            break;

          default: // 6
            result = (value[0] ^ 0xff) + ((value[1] ^ 0xff) * 0x1_00) + ((value[2] ^ 0xff) * 0x1_00_00) + ((value[3] ^ 0xff) * 0x1_00_00_00) + ((value[4] ^ 0xff) * 0x1_00_00_00_00) + ((value[5] ^ 0xff) * 0x1_00_00_00_00_00);
            break;
        }
      } else {
        for (let i = 0; i < count; i++) {
          result = (result * 0x1_00) + (value[i] ^ 0xff);
        }
      }

      return count
        ? new BN((result * -1) - 1)
        : new BN(0);
    } else if (isLe) {
      // Most common case - u{8, 16, 32} default LE SCALE-encoded
      //
      // There are some slight benefits in unrolling this specific loop,
      // however it comes with diminishing returns since here the actual
      // `new BN` does seem to take up the bulk of the time
      switch (count) {
        case 0:
          return new BN(0);

        case 1:
          return new BN(value[0]);

        case 2:
          return new BN(value[0] + (value[1] * 0x1_00));

        case 3:
          return new BN(value[0] + (value[1] * 0x1_00) + (value[2] * 0x1_00_00));

        case 4:
          return new BN(value[0] + (value[1] * 0x1_00) + (value[2] * 0x1_00_00) + (value[3] * 0x1_00_00_00));

        case 5:
          return new BN(value[0] + (value[1] * 0x1_00) + (value[2] * 0x1_00_00) + (value[3] * 0x1_00_00_00) + (value[4] * 0x1_00_00_00_00));

        default: // 6
          return new BN(value[0] + (value[1] * 0x1_00) + (value[2] * 0x1_00_00) + (value[3] * 0x1_00_00_00) + (value[4] * 0x1_00_00_00_00) + (value[5] * 0x1_00_00_00_00_00));
      }
    } else {
      let result = 0;

      for (let i = 0; i < count; i++) {
        result = (result * 0x1_00) + value[i];
      }

      return new BN(result);
    }
  }

  return isNegative
    ? new BN(value, isLe ? 'le' : 'be').fromTwos(value.length * 8)
    : new BN(value, isLe ? 'le' : 'be');
}

export { u8aToBn };
