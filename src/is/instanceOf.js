// ISC, Copyright 2017 Jaco Greeff
// @flow

/**
  @name isInstanceOf
  @signature isInstanceOf (value: mixed, clazz: Class<mixed>): boolean
  @summary Tests for a instance of a class.
  @description
    Checks to see if the input value is an instance of the test class.
  @example
    import { isInstanceOf } from '@polkadot/util';

    console.log('isInstanceOf', isInstanceOf(new Array(0), Array)); // => true
*/
module.exports = function isInstanceOf (value: mixed, clazz: Class<mixed>): boolean {
  return value instanceof clazz;
};
