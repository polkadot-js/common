// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { u8aToU8a } from './toU8a';

function compare (a: Uint8Array, b: Uint8Array): number {
  let i = 0;

  while (true) {
    const overA = i >= a.length;
    const overB = i >= b.length;

    if (overA && overB) {
      // both ends reached
      return 0;
    } else if (overA) {
      // a has no more data, b has data
      return -1;
    } else if (overB) {
      // b has no more data, a has data
      return 1;
    } else if (a[i] !== b[i]) {
      // the number in this index doesn't match
      return a[i] > b[i]
        ? 1
        : -1;
    }

    i++;
  }
}

/**
 * @name u8aCmp
 * @summary Compares two Uint8Arrays.
 * @description
 * For `UInt8Array` (or hex string) input values returning -, 0 or +1
 * @example
 * <BR>
 *
 * ```javascript
 * import { u8aCmp} from '@polkadot/util';
 *
 * u8aCmp(new Uint8Array([0x67, 0x65]), new Uint8Array([0x68, 0x65])); // -1
 * u8aCmp(new Uint8Array([0x68, 0x65]), new Uint8Array([0x68, 0x65])); // 0
 * u8aCmp(new Uint8Array([0x69, 0x65]), new Uint8Array([0x68, 0x65])); // +1
 * ```
 */
export function u8aCmp (a: Uint8Array | string, b: Uint8Array | string): number {
  return compare(u8aToU8a(a), u8aToU8a(b));
}
