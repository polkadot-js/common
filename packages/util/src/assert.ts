// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { isFunction } from './is/function.js';

type MessageFn = () => string;

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
 * assert(true, 'True should be true'); // passes
 * assert(false, 'False should not be true'); // Error thrown
 * assert(false, () => 'message'); // Error with 'message'
 * ```
 */
export function assert (condition: unknown, message: string | MessageFn): asserts condition {
  if (!condition) {
    throw new Error(
      isFunction(message)
        ? message()
        : message
    );
  }
}

/**
 * @name assertReturn
 * @description Returns when the value is not undefined/null, otherwise throws assertion error
 */
export function assertReturn <T> (value: T | undefined | null, message: string | MessageFn): T {
  assert(value !== undefined && value !== null, message);

  return value;
}

/**
 * @name assertUnreachable
 * @description An assertion helper that ensures all codepaths are followed
 */
export function assertUnreachable (x: never): never {
  throw new Error(`This codepath should be unreachable. Unhandled input: ${x as unknown as string}`);
}
