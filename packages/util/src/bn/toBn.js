// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const BN = require('bn.js');

/**
  @name bnToBn
  @signature bnToBn (value?: BN : number): BN
  @summary Creates a BN value from a BN.js bignumber or number input.
  @description
    `null` inputs returns a `0x0` result, BN values returns the value, numnbers returns a BN representation.
  @example
    import BN from 'bn.js';
    import { bnToBn } from '@polkadot/util';

    bnToBn(0x1234); // => BN(0x1234)
    bnToBn(new BN(0x1234)); // => BN(0x1234)
*/
module.exports = function bnToBn (value?: BN | number): BN {
  return BN.isBN(value)
    ? value
    : new BN(value || 0);
};
