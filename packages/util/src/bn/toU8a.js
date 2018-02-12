// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';

const hexToU8a = require('../hex/toU8a');
const bnToBn = require('./toBn');
const bnToHex = require('./toHex');

/**
  @name bnToU8a
  @signature bnToU8a (value?: BN | number, bitLength: number = -1): Uint8Array
  @summary Creates a Uint8Array object from a BN.
  @description
    `null`/`undefined`/`NaN` inputs returns an empty `Uint8Array` result. `BN` input values return the actual bytes value converted to a `Uint8Array`.
  @example
    import { bnToU8a } from '@polkadot/util';

    bnToU8a(new BN(0x1234)); // => [0x12, 0x34]
*/
module.exports = function bnToU8a (value?: BN | number, bitLength: number = -1): Uint8Array {
  if (!value) {
    return new Uint8Array([]);
  }

  return hexToU8a(
    bnToHex(bnToBn(value), bitLength)
  );
};
