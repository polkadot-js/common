// ISC, Copyright 2017-2018 Jaco Greeff
// @flow

/**
  @name isFunction
  @signature isFunction (value: mixed): boolean
  @summary Tests for a `function`.
  @description
    Checks to see if the input value is a JavaScript function.
  @example
    import { isFunction } from '@polkadot/util';

    console.log('isFunction', isFunction(() => false)); // => true
*/
module.exports = function isFunction (value: mixed): boolean {
  return typeof value === 'function';
};
