// Copyright 2017-2023 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { BufferObj, BufferObjClass } from '../types.js';

import { xglobal } from '@polkadot/x-global';

import { hasBuffer } from '../has.js';
import { isFunction } from './function.js';

/**
 * @name isBuffer
 * @summary Tests for a `Buffer` object instance.
 * @description
 * Checks to see if the input object is an instance of `Buffer`.
 * @example
 * <BR>
 *
 * ```javascript
 * import { isBuffer } from '@polkadot/util';
 *
 * console.log('isBuffer', isBuffer(Buffer.from([]))); // => true
 * ```
 */
export function isBuffer (value: unknown): value is Buffer {
  // we do check a function first, since it is slightly faster than isBuffer itself
  return hasBuffer && !!value && isFunction((value as unknown as BufferObj).readDoubleLE) && (xglobal.Buffer as unknown as BufferObjClass).isBuffer(value);
}
