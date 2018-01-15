// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const isInstanceOf = require('./instanceOf');

/**
  @name isBuffer
  @signature isBuffer (value: mixed): boolean
  @summary Tests for a `Buffer` object instance.
  @description
    Checks to see if the input object is an instance of `Buffer`.
  @example
    import { isBuffer } from '@polkadot/util';

    console.log('isBuffer', isBuffer(Buffer.from([]))); // => true
*/
module.exports = function isBuffer (value: mixed): boolean {
  return isInstanceOf(value, Buffer);
};
