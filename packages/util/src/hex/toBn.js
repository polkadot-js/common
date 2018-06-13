// Copyright 2017-2018 @polkadot/util authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const BN = require('bn.js');

const hexStripPrefix = require('./stripPrefix');

function reverse (value: string): string {
  return (value.match(new RegExp('.{1,2}', 'g')) || [])
    .reverse()
    .join('');
}

/**
  @name hexToBn
  @signature hexToBn (value?: string, isLe: boolean = false): BN
  @summary Creates a BN.js bignumber object from a hex string.
  @description
    `null` inputs returns a `BN(0)` result. Hex input values return the actual value converted to a BN. Anything that is not a hex string (including the `0x` prefix) throws an error.
  @example
    import { hexToBn } from '@polkadot/util';

    hexToBn('0x123480001f'); // => BN(0x123480001f)
*/
module.exports = function hexToBn (_value?: string, isLe: boolean = false): BN {
  // flowlint-next-line sketchy-null-string:off
  if (!_value) {
    return new BN(0);
  }

  const value = hexStripPrefix(_value);

  return new BN((isLe ? reverse(value) : value) || '00', 16);
};
