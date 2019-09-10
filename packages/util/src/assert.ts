// Copyright 2017-2019 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import isFunction from './is/function';

type MessageFn = () => string;

type Falsy = null | undefined | false | 0 | ''; // No NaN type

/**
 * @name assert
 * @summary Checks for a valid test, if not Error is thrown.
 * @description
 * Checks that `test` is a truthy value. If value is falsy (`null`, `undefined`, `false`, ...), it throws an Error with the supplied `message`. When `test` passes, `true` is returned.
 * @example
 * <BR>
 *
 * ```javascript
 * const { assert } from '@polkadot/util';
 *
 * assert(true, 'True should be true'); // true returned
 * assert(false, 'False should not be true'); // Error thrown
 * assert(false, () => 'message'); // Error with 'message'
 * ```
 */
export default function assert<T> (test: Falsy | T, message: string | MessageFn): test is T {
  if (test) {
    return true;
  }

  if (isFunction(message)) {
    message = message();
  }

  throw new Error(message);
}
