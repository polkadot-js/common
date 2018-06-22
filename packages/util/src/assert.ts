// Copyright 2017-2018 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import ExtError from './ext/error';
import isFunction from './is/function';

type MessageFn = () => string;

/**
  @name assert
  @signature assert (test: any, message: string | () => string, code: number = ExtError.CODES.ASSERT, data: any): void
  @summary Checks for a valid test, if not ExtError is thrown.
  @description
    Checks that `test` is a truthy value. If value is falsy (`null`, `undefined`, `false`, ...), it throws an ExtError with the supplied `message` and an optional `code` and `data`. When `test` passes, `true` is returned.
  @example
    const assert from '@polkadot/util/assert');

    assert(true, 'True should be true'); // true returned
    assert(false, 'False should not be true'); // ExtError thrown
    assert(false, () => 'message'); // ExtError with 'message'
*/
export default function assert (test: any, message: string | MessageFn, code: number = ExtError.CODES.ASSERT, data?: any): boolean {
  if (test) {
    return true;
  }

  if (isFunction(message)) {
    message = message();
  }

  throw new ExtError(message, code, data);
}
