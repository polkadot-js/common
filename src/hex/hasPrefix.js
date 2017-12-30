// ISC, Copyright 2017 Jaco Greeff
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
  return !!(value && isHex(value) && value.substr(0, 2) === '0x');
};
