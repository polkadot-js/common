// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const isHex = require('../is/hex');

/**
  @name hexHasPrefix
  @signature hexHasPrefix (value: ?string): boolean
  @summary Tests for the existence of a `0x` prefix.
  @description
    Checks for a valid hex input value and if the start matched `0x`
  @example
    import { hexHasPrefix } from '@polkadot/util';

    console.log('has prefix', hexHasPrefix('0x1234')); // => true
*/
module.exports = function hexHasPrefix (value: ?string): boolean {
  // flowlint-next-line sketchy-null-string:off
  return !!(value && isHex(value, -1, true) && value.substr(0, 2) === '0x');
};
