// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

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
export function isFunction (value: unknown): value is FnType {
  return typeof value === 'function';
}
