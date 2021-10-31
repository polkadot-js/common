// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

function isByteZero (v: number): boolean {
  return !v;
}

/**
 * @name u8aEmpty
 * @summary Tests for a `Uint8Array` for emptyness
 * @description
 * Checks to see if the input `Uint8Array` has zero length or contains all 0 values.
 */
export function u8aEmpty (value: Uint8Array): boolean {
  return value.length === 0 || value.every(isByteZero);
}
