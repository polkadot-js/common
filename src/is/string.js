// ISC, Copyright 2017 Jaco Greeff
// @flow

/**
  @name isString
  @signature isString (value: mixed): boolean
  @summary Tests for a string.
  @description
    Checks to see if the input value is a JavaScript string.
  @example
    import { isString } from '@polkadot/util';

    console.log('isString', isString('test')); // => true
*/
module.exports = function isString (value: mixed): boolean {
  return typeof value === 'string';
};
