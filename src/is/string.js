// ISC, Copyright 2017 Jaco Greeff
// @flow

/**
  @name isString
  @signature isString (value: any): boolean
  @summary Tests for a string.
  @description
    Checks to see if the input value is a JavaScript string.
  @example
    import { isString } from '@polkadot/util';

    console.log('isString', isString('test')); // => true
*/
module.exports = function isString (value: any): boolean {
  return typeof value === 'string';
};
