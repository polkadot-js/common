// Copyright 2017-2025 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { NumberOptions, ToBn } from '../types.js';
import type { BN } from './bn.js';

import { bnToBn } from './toBn.js';

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
export function bnToU8a <ExtToBn extends ToBn> (value?: ExtToBn | BN | bigint | number | null, { bitLength = -1, isLe = true, isNegative = false } = DEFAULT_OPTS): Uint8Array {
  const valueBn = bnToBn(value);
  const byteLength = bitLength === -1
    ? Math.ceil(valueBn.bitLength() / 8)
    : Math.ceil((bitLength || 0) / 8);

  if (!value) {
    return bitLength === -1
      ? new Uint8Array(1)
      : new Uint8Array(byteLength);
  }

  const output = new Uint8Array(byteLength);
  const bn = isNegative
    ? valueBn.toTwos(byteLength * 8)
    : valueBn;

  output.set(bn.toArray(isLe ? 'le' : 'be', byteLength), 0);

  return output;
}
