// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const BN = require('bn.js');

const hexStripPrefix = require('./stripPrefix');

/**
  @name hexToBn
  @signature hexToBn (value?: string): BN
  @summary Creates a BN.js bignumber object from a hex string.
  @description
    `null` inputs returns a `BN(0)` result. Hex input values return the actual value converted to a BN. Anything that is not a hex string (including the `0x` prefix) throws an error.
  @example
    import { hexToBn } from '@polkadot/util';

    hexToBn('0x123480001f'); // => BN(0x123480001f)
*/
module.exports = function hexToBn (value?: string): BN {
  // flowlint-next-line sketchy-null-string:off
  if (!value) {
    return new BN(0);
  }

  return new BN(hexStripPrefix(value) || '0', 16);
};
