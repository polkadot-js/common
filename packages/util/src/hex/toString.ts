// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import u8aToString from '../u8a/toString';
import hexToU8a from './toU8a';

/**
 * @name hexToU8a
 * @summary Creates a Uint8Array object from a hex string.
 * @description
 * Hex input values return the actual bytes value converted to a string. Anything that is not a hex string (including the `0x` prefix) throws an error.
 * @example
 * <BR>
 *
 * ```javascript
 * import { hexToString } from '@polkadot/util';
 *
 * hexToU8a('0x68656c6c6f'); // hello
 * ```
 */
export default function hexToString (_value?: string | null): string {
  return u8aToString(
    hexToU8a(_value)
  );
}
