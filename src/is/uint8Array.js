// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
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
