// Copyright 2017-2023 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { xglobal } from '@polkadot/x-global';

import { hasBuffer } from '../has.js';
import { isFunction } from './function.js';

// We define a scappy low-level interface to mock Buffer
// (this removes the need for the node typings in built bundles)
interface BufTyp extends Function { isBuffer: (value: unknown) => boolean }
interface BufObj { readDoubleLE: (...args: unknown[]) => unknown }

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
  return hasBuffer && isFunction(value && (value as unknown as BufObj).readDoubleLE) && (xglobal.Buffer as BufTyp).isBuffer(value);
}
