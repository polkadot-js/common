// ISC, Copyright 2017-2018 Jaco Greeff
// @flow

/**
  @name isNumber
  @signature isNumber (value: mixed): boolean
  @summary Tests for a JavaScript number.
  @description
    Checks to see if the input value is a valid number.
  @example
    import { isNumber } from '@polkadot/util';

    console.log('isNumber', isNumber(1234)); // => true
*/
module.exports = function isNumber (value: mixed): boolean {
  return typeof value === 'number';
};
