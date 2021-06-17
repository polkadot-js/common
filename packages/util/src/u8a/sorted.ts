// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { u8aCmp } from './cmp';

/**
 * @name u8aSorted
 * @summary Sorts an array of Uint8Arrays
 * @description
 * For input `UInt8Array[]` return the sorted result
 * @example
 * <BR>
 *
 * ```javascript
 * import { u8aSorted} from '@polkadot/util';
 *
 * u8aSorted([new Uint8Array([0x69]), new Uint8Array([0x68])]); // [0x68, 0x69]
 * ```
 */
export function u8aSorted (u8as: Uint8Array[]): Uint8Array[] {
  return u8as.sort(u8aCmp);
}
