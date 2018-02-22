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
  @signature bnToU8a (value?: BN | number, bitLength: number = -1, isLE: boolean = false): Uint8Array
  @summary Creates a Uint8Array object from a BN.
  @description
    `null`/`undefined`/`NaN` inputs returns an empty `Uint8Array` result. `BN` input values return the actual bytes value converted to a `Uint8Array`. Optionally convert using little-endian format if `isLE` is set.
  @example
    import { bnToU8a } from '@polkadot/util';

    bnToU8a(new BN(0x1234)); // => [0x12, 0x34]
*/
module.exports = function bnToU8a (value?: BN | number, bitLength: number = -1, isLe: boolean = false): Uint8Array {
  const byteLength = Math.ceil(bitLength / 8);

  // flowlint-next-line sketchy-null-number:off
  if (!value) {
    return bitLength === -1
      ? new Uint8Array([])
      : new Uint8Array(byteLength);
  }

  if (bitLength === -1) {
    return hexToU8a(
      bnToHex(bnToBn(value || 0), bitLength)
    );
  }

  const output = new Uint8Array(byteLength);

  output.set(
    bnToBn(value).toArray(isLe ? 'le' : 'be', byteLength),
    0
  );

  return output;
};
