// ISC, Copyright 2017 Jaco Greeff
// @flow

const bnFromHex = require('../hex/toBn');

/**
  @name bnFromHex
  @signature bnFromHex (value?: string): BN
  @summary Creates a BN.js bignumber object from a hex string. [hex.md#hextobn](alias hexToBn)
  @description
    `null` inputs returns a `BN(0)` result. Hex input values return the actual value converted to a BN. Anything that is not a hex string (including the `0x` prefix) throws an error.
  @example
    import { bnFromHex } from '@polkadot/util';

    console.log('BN object', bnFromHex('0x123480001f'));
*/
module.exports = bnFromHex;
