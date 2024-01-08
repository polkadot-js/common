// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

interface Options {
  bitLength?: 32 | 64;
  isLe?: boolean;
}

/**
 * @name floatToU8a
 * @description Converts a float into a U8a representation (While we don't use BE in SCALE
 * we still allow for either representation, although, as elsewhere, isLe is default)
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function floatToU8a (value: String | string | number | Number = 0.0, { bitLength = 32, isLe = true }: Options = {}): Uint8Array {
  if (bitLength !== 32 && bitLength !== 64) {
    throw new Error('Invalid bitLength provided, expected 32 or 64');
  }

  const result = new Uint8Array(bitLength / 8);
  const dv = new DataView(result.buffer, result.byteOffset);

  if (bitLength === 32) {
    dv.setFloat32(0, Number(value), isLe);
  } else {
    dv.setFloat64(0, Number(value), isLe);
  }

  return result;
}
