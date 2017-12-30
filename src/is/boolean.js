// ISC, Copyright 2017 Jaco Greeff
// @flow

/**
  @name isBoolean
  @signature isBoolean (value: mixed): boolean
  @summary Tests for a boolean value.
  @description
    Checks to see if the input value is a JavaScript boolean.
  @example
    import { isBoolean } from '@polkadot/util';

    isBoolean(false); // => true
*/
module.exports = function isBoolean (value: mixed): boolean {
  return typeof value === 'boolean';
};
