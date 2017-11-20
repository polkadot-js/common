// ISC, Copyright 2017 Jaco Greeff
// @flow

const isInstanceOf = require('./instanceOf');

/**
  @name isBuffer
  @signature isBuffer (value: any): boolean
  @summary Tests for a `Buffer` object instance.
  @description
    Checks to see if the input object is an instance of `Buffer`.
  @example
    import { isBuffer } from '@polkadot/util';

    console.log('isBuffer', isBuffer(Buffer.from([]))); // => true
*/
module.exports = function isBuffer (value: any): boolean {
  return isInstanceOf(value, Buffer);
};
