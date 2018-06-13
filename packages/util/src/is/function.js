// Copyright 2017-2018 @polkadot/util authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

/**
  @name isFunction
  @signature isFunction (value: mixed): boolean
  @summary Tests for a `function`.
  @description
    Checks to see if the input value is a JavaScript function.
  @example
    import { isFunction } from '@polkadot/util';

    console.log('isFunction', isFunction(() => false)); // => true
*/
module.exports = function isFunction (value: mixed): boolean {
  return typeof value === 'function';
};
