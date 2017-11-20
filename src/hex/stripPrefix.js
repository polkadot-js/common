// ISC, Copyright 2017 Jaco Greeff
// @flow

const hasPrefix = require('./hasPrefix');

/**
  @name hexStripPrefix
  @signature hexStripPrefix (value: ?string): string
  @summary Strips any leading `0x` prefix.
  @description
    Tests for the existence of a `0x` prefix, and returns the value without the prefix. Un-prefixed values are returned as-is.
  @example
    import { hexStripPrefix } from '@polkadot/util';

    console.log('stripped', hexStripPrefix('0x1234')); // => 1234
*/
module.exports = function hexStripPrefix (value: ?string): string {
  if (value && hasPrefix(value)) {
    return value.substr(2);
  }

  return value || '';
};
