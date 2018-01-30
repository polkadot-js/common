// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const hexStripPrefix = require('./stripPrefix');

/**
  @name hexToU8a
  @signature hexToU8a (value?: string): Uint8Array
  @summary Creates a Buffer object from a hex string.
  @description
    `null` inputs returns an empty `Uint8Array` result. Hex input values return the actual bytes value converted to a Uint8Array. Anything that is not a hex string (including the `0x` prefix) throws an error.
  @example
    import { hexToU8a } from '@polkadot/util';

    hexToU8a('0x123480001f'); // Uint8Array([0x12, 0x34, 0x80, 0x00, 0x1f])
*/
module.exports = function hexToU8a (_value?: string): Uint8Array {
  // flowlint-next-line sketchy-null-string:off
  if (!_value) {
    return new Uint8Array([]);
  }

  const value = hexStripPrefix(_value);
  const bufLength = Math.ceil(value.length / 2);
  const result = new Uint8Array(bufLength);

  for (let index = 0; index < bufLength; index++) {
    result[index] = parseInt(value.substr(index * 2, 2), 16);
  }

  return result;
};
