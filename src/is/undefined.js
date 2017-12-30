// ISC, Copyright 2017 Jaco Greeff
// @flow

/**
  @name isUndefined
  @signature isUndefined (value: mixed): boolean
  @summary Tests for a `undefined` values.
  @description
    Checks to see if the input value is `undefined`.
  @example
    import { isUndefined } from '@polkadot/util';

    console.log('isUndefined', isUndefined(void(0))); // => true
*/
module.exports = function isUndefined (value: mixed): boolean {
  return typeof value === 'undefined';
};
