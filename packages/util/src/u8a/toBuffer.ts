// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { BufferClass, BufferObject } from '../types.js';

import { xglobal } from '@polkadot/x-global';

import { hasBuffer } from '../has.js';

/**
 * @name u8aToBuffer
 * @summary Creates a Buffer object from a hex string.
 * @description
 * `null` inputs returns an empty `Buffer` result. `UInt8Array` input values return the actual bytes value converted to a `Buffer`. Anything that is not a `UInt8Array` throws an error.
 * @example
 * <BR>
 *
 * ```javascript
 * import { u8aToBuffer } from '@polkadot/util';
 *
 * console.log('Buffer', u8aToBuffer(new Uint8Array([1, 2, 3])));
 * ```
 */
export function u8aToBuffer <T = BufferObject> (value?: Uint8Array | null): T {
  return hasBuffer
    ? (xglobal.Buffer as unknown as BufferClass).from(value || [])
    : new Uint8Array(value || []) as T;
}
