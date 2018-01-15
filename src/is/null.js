// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

/**
  @name isNull
  @signature isNull (value: mixed): boolean
  @summary Tests for a `null` values.
  @description
    Checks to see if the input value is `null`.
  @example
    import { isNull } from '@polkadot/util';

    console.log('isNull', isNull(null)); // => true
*/
module.exports = function isNull (value: mixed): boolean {
  return value === null;
};
