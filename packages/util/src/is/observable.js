// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const isFunction = require('./function');
const isObject = require('./object');

/**
  @name isBObservable
  @signature isObservable (value: mixed): boolean
  @summary Tests for a `Observable` object instance.
  @description
    Checks to see if the input object is an instance of `BN` (bn.js).
  @example
    import { isObservable } from '@polkadot/util';

    console.log('isObservable', isObservable(...));
*/
module.exports = function isObservable (value: mixed): boolean {
  // $FlowFixMe check for possibly non-existent .next
  return isObject(value) && isFunction(value.next);
};
