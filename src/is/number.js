// ISC, Copyright 2017 Jaco Greeff
// @flow

/**
  @name isNumber
  @signature isNumber (value: any): boolean
  @summary Tests for a JavaScript number.
  @description
    Checks to see if the input value is a valid number.
  @example
    import { isNumber } from '@polkadot/util';

    console.log('isNumber', isNumber(1234)); // => true
*/
module.exports = function isNumber (value: any): boolean {
  return typeof value === 'number';
};
