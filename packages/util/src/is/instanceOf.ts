// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

/**
 * @name isInstanceOf
 * @summary Tests for a instance of a class.
 * @description
 * Checks to see if the input value is an instance of the test class.
 * @example
 * <BR>
 *
 * ```javascript
 * import { isInstanceOf } from '@polkadot/util';
 *
 * console.log('isInstanceOf', isInstanceOf(new Array(0), Array)); // => true
 * ```
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export default function isInstanceOf (value: unknown, clazz: Function): boolean {
  return value instanceof clazz;
}
