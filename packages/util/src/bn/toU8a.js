// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

/**
  @name bnToU8a
  @signature bnToU8a (value?: BN): Uint8Array
  @summary Creates a Uint8Array object from a BN.
  @description
    `null`/`undefined`/`NaN` inputs returns an empty `Uint8Array` result. `BN` input values return the actual bytes value converted to a `Uint8Array`.
  @example
    import { bnToU8a } from '@polkadot/util';

    bnToU8a(new BN(0x1234)); // => [0x12, 0x34]
*/
module.exports = function bnToU8a (value?: BN): Uint8Array {
  if (!value) {
    return new Uint8Array([]);
  }

  return new Uint8Array(value.toArray());
};
