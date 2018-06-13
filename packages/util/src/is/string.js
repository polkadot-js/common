// Copyright 2017-2018 @polkadot/util authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

/**
  @name isString
  @signature isString (value: mixed): boolean
  @summary Tests for a string.
  @description
    Checks to see if the input value is a JavaScript string.
  @example
    import { isString } from '@polkadot/util';

    console.log('isString', isString('test')); // => true
*/
module.exports = function isString (value: mixed): boolean {
  return typeof value === 'string';
};
