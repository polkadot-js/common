// Copyright 2017-2025 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

interface Options {
  bitLength?: 32 | 64;
  isLe?: boolean;
}

/**
 * @name u8aToFloat
 * @description Converts a Uint8Array value into the float (either 32 or 64-bit)
 * representation.
 */
export function u8aToFloat (value: Uint8Array, { bitLength = 32, isLe = true }: Options = {}): number {
  if (bitLength !== 32 && bitLength !== 64) {
    throw new Error('Invalid bitLength provided, expected 32 or 64');
  } else if (value.length < (bitLength / 8)) {
    throw new Error(`Invalid input buffer provided, expected at least ${bitLength / 8} bytes, found ${value.length}`);
  }

  const dv = new DataView(value.buffer, value.byteOffset);

  return bitLength === 32
    ? dv.getFloat32(0, isLe)
    : dv.getFloat64(0, isLe);
}
