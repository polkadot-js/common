// Copyright 2017-2018 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import './polyfill/textEncoder';

const encoder = new TextEncoder();

/**
 * @name stringToU8a
 * @signature stringToU8a (value?: string): UInt8Array
 * @summary Creates a Uint8Array object from a utf-8 string.
 * @description
 * String input values return the actual encoded `UInt8Array`. `null` or `undefined` values returns an empty encoded array.
 * @example
 * <BR>
 *
 * ```javascript
 * import { stringToU8a } from '@polkadot/util';
 *
 * stringToU8a('hello'); // [0x68, 0x65, 0x6c, 0x6c, 0x6f]
 * ```
 */
export default function stringToU8a (value?: string): Uint8Array {
  if (!value) {
    return new Uint8Array([]);
  }

  return encoder.encode(value);
}
