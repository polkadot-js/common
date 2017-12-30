// ISC, Copyright 2017 Jaco Greeff
// @flow

/**
  @name isNull
  @signature isNull (value: mixed): boolean
  @summary Tests for a `null` values.
  @description
    Checks to see if the input value is `null`.
  @example
    import { isNull } from '@polkadot/util';

    console.log('isNull', isNull(null)); // => true
*/
module.exports = function isNull (value: mixed): boolean {
  return value === null;
};
