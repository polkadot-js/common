// ISC, Copyright 2017 Jaco Greeff
// @flow

/**
  @name isFunction
  @signature isFunction (value: any): boolean
  @summary Tests for a `function`.
  @description
    Checks to see if the input value is a JavaScript function.
  @example
    import { isFunction } from '@polkadot/util';

    console.log('isFunction', isFunction(() => false)); // => true
*/
module.exports = function isFunction (value: any): boolean {
  return typeof value === 'function';
};
