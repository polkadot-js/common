// ISC, Copyright 2017 Jaco Greeff
// @flow

const ExtError = require('./ext/error');
const isFunction = require('./is/function');

/**
  @name assert
  @signature assert (test: any, message: string | () => string, code: number = ExtError.CODES.ASSERT, data: any): void
  @summary Checks for a valid test, if not ExtError is thrown.
  @description
    Checks that `test` is a truthy value. If value is falsy (`null`, `undefined`, `false`, ...), it throws an ExtError with the supplied `message` and an optional `code` and `data`. When `test` passes, `true` is returned.
  @example
    const assert = require('@polkadot/util/assert');

    assert(true, 'True should be true'); // true returned
    assert(false, 'False should not be true'); // ExtError thrown
    assert(false, () => 'message'); // ExtError with 'message'
*/
module.exports = function assert (test: any, message: string | () => string, code: number = ExtError.CODES.ASSERT, data: any): boolean {
  if (test) {
    return true;
  }

  if (isFunction(message)) {
    message = ((message: any): () => string)();
  }

  throw new ExtError(((message: any): string), code, data);
};
