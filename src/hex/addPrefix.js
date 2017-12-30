// ISC, Copyright 2017 Jaco Greeff
// @flow

const hasPrefix = require('./hasPrefix');

/**
  @name hexAddPrefix
  @signature hexAddPrefix (value: ?string): string
  @summary Adds the `0x` prefix to string values.
  @description
    Returns a `0x` prefixed string from the input value. If the input is already prefixed, it is returned unchanged.
  @example
    import { hexAddPrefix } from '@polkadot/util';

    console.log('With prefix', hexAddPrefix('0a0b12')) // => 0x0a0b12
*/
module.exports = function hexAddPrefix (value: ?string): string {
  // flowlint-next-line sketchy-null-string:off
  if (value && hasPrefix(value)) {
    return value;
  }

  // flowlint-next-line sketchy-null-string:off
  const prefix = value && value.length % 2 === 1
    ? '0'
    : '';

  return `0x${prefix}${value || ''}`;
};
