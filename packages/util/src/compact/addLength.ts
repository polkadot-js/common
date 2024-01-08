// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { u8aConcatStrict } from '../u8a/index.js';
import { compactToU8a } from './toU8a.js';

/**
 * @name compactAddLength
 * @description Adds a length prefix to the input value
 * @example
 * <BR>
 *
 * ```javascript
 * import { compactAddLength } from '@polkadot/util';
 *
 * console.log(compactAddLength(new Uint8Array([0xde, 0xad, 0xbe, 0xef]))); // Uint8Array([4 << 2, 0xde, 0xad, 0xbe, 0xef])
 * ```
 */
export function compactAddLength (input: Uint8Array): Uint8Array {
  return u8aConcatStrict([
    compactToU8a(input.length),
    input
  ]);
}
