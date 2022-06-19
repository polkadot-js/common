// Copyright 2017-2022 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { isString } from '../is/string';

// eslint-disable-next-line @typescript-eslint/ban-types
type AnyFloat = number | Number;

interface Options {
  bitLength?: 32 | 64;
  isLe?: boolean;
}

/**
 * @name floatToU8a
 * @description Converts a float into a U8a representation (While we don't use BE in SCALE
 * we still allow for either representation, although, as elsewhere, isLe is default)
 */
export function floatToU8a (value: string | AnyFloat = '0.0', { bitLength = 32, isLe = true }: Options = {}): Uint8Array {
  if (bitLength !== 32 && bitLength !== 64) {
    throw new Error('Invalid bitLength provided, expected 32 or 64');
  }

  const result = new Uint8Array(bitLength / 8);
  const dv = new DataView(result.buffer, result.byteOffset);

  if (value instanceof Number) {
    value = value.toString();
  }

  if (isString(value)) {
    if (bitLength === 32) {
      dv.setFloat32(0, parseFloat(value), isLe);
    } else {
      dv.setFloat64(0, parseFloat(value), isLe);
    }
  } else if (bitLength === 32) {
    dv.setFloat32(0, value, isLe);
  } else {
    dv.setFloat64(0, value, isLe);
  }

  return result;
}
