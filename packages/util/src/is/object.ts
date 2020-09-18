// Copyright 2017-2020 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

interface ObjectIndexed {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any;
}

/**
 * @name isObject
 * @summary Tests for an `object`.
 * @description
 * Checks to see if the input value is a JavaScript object.
 * @example
 * <BR>
 *
 * ```javascript
 * import { isObject } from '@polkadot/util';
 *
 * isObject({}); // => true
 * isObject('something'); // => false
 * ```
 */
export default function isObject (value: unknown): value is ObjectIndexed {
  return typeof value === 'object';
}
