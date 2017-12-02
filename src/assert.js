// ISC, Copyright 2017 Jaco Greeff
// @flow

const ExtError = require('./ext/error');

/**
  @name assert
  @signature assert (test: boolean, message: string, code: number = ExtError.CODES.ASSERT, data: any): void
  @summary Checks for a valid test, if not ExtError is thrown.
  @description
    Checks that `test` is a true value. If value is `false` (or `false-ish`), it throws an ExtError with the supplied `message` and an optional `code` and `data`. When `test` passes, `true` is returned.
  @example
    const assert = require('@polkadot/util/assert');

    assert(true === true, 'True should be true'); // true returned
    assert(false === true, 'False should not be true'); // ExtError thrown
*/
module.exports = function assert (test: boolean, message: string, code: number = ExtError.CODES.ASSERT, data: any): boolean {
  if (!test) {
    throw new ExtError(message, code, data);
  }

  return true;
};
