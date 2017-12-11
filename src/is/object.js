// ISC, Copyright 2017 Jaco Greeff
// @flow

/**
  @name isObject
  @signature isObject (value: any): boolean
  @summary Tests for an `object`.
  @description
    Checks to see if the input value is a JavaScript object.
  @example
    import { isObject } from '@polkadot/util';

    isObject({}); // => true
    isObject('something'); // => false
*/
module.exports = function isObject (value: any): boolean {
  return typeof value === 'object';
};
