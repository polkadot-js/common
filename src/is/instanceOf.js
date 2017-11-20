// ISC, Copyright 2017 Jaco Greeff
// @flow

/**
  @name isInstanceOf
  @signature isInstanceOf (value: any, clazz: any): boolean
  @summary Tests for a instance of a class.
  @description
    Checks to see if the input value is an instance of the test class.
  @example
    import { isInstanceOf } from '@polkadot/util';

    console.log('isinstanceOf', isInstanceOf(new Array(0), Array)); // => true
*/
module.exports = function isInstanceOf (value: any, clazz: any): boolean {
  return value instanceof clazz;
};
