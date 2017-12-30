// ISC, Copyright 2017 Jaco Greeff
// @flow

const isInstanceOf = require('./instanceOf');

/**
  @name isUint8Array
  @signature isUint8Array (value: mixed): boolean
  @summary Tests for a `Uint8Array` object instance.
  @description
    Checks to see if the input object is an instance of `Uint8Array`.
  @example
    import { isUint8Array } from '@polkadot/util';

    console.log('isUint8Array', isUint8Array([])); // => false
*/
module.exports = function isUint8Array (value: mixed): boolean {
  return isInstanceOf(value, Uint8Array);
};
