// ISC, Copyright 2017 Jaco Greeff
// @flow

const hexStripPrefix = require('./stripPrefix');

/**
  @name hexToBuffer
  @signature hexToBuffer (value?: string): Buffer
  @summary Creates a Buffer object from a hex string.
  @description
    `null` inputs returns an empty `Buffer` result. Hex input values return the actual bytes value converted to a Buffer. Anything that is not a hex string (including the `0x` prefix) throws an error.
  @example
    import { hexToBuffer } from '@polkadot/util';

    hexToBuffer('0x123480001f'); // Buffer([0x12, 0x34, 0x80, 0x00, 0x1f])
*/
module.exports = function hexToBuffer (value?: string): Buffer {
  // flowlint-next-line sketchy-null-string:off
  if (!value) {
    return Buffer.from([]);
  }

  return Buffer.from(hexStripPrefix(value), 'hex');
};
