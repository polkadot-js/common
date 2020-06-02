// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

// eslint-disable-next-line @typescript-eslint/ban-types
type FnType = Function;

/**
 * @name isFunction
 * @summary Tests for a `function`.
 * @description
 * Checks to see if the input value is a JavaScript function.
 * @example
 * <BR>
 *
 * ```javascript
 * import { isFunction } from '@polkadot/util';
 *
 * isFunction(() => false); // => true
 * ```
 */
export default function isFunction (value: unknown): value is FnType {
  return typeof value === 'function';
}
