// Copyright 2017-2018 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const ExtError = require('./ext/error');
const isFunction = require('./is/function');

/**
  @name assert
  @signature assert (test: mixed, message: string | () => string, code: number = ExtError.CODES.ASSERT, data: mixed): void
  @summary Checks for a valid test, if not ExtError is thrown.
  @description
    Checks that `test` is a truthy value. If value is falsy (`null`, `undefined`, `false`, ...), it throws an ExtError with the supplied `message` and an optional `code` and `data`. When `test` passes, `true` is returned.
  @example
    const assert = require('@polkadot/util/assert');

    assert(true, 'True should be true'); // true returned
    assert(false, 'False should not be true'); // ExtError thrown
    assert(false, () => 'message'); // ExtError with 'message'
*/
module.exports = function assert (test: mixed, message: string | () => string, code: number = ExtError.CODES.ASSERT, data: mixed): boolean {
  // flowlint-next-line sketchy-null:off
  if (test) {
    return true;
  }

  if (isFunction(message)) {
    // $FlowFixMe we have a function here
    message = message();
  }

  // $FlowFixMe we have a string here
  throw new ExtError(message, code, data);
};
