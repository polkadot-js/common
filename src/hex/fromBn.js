// ISC, Copyright 2017 Jaco Greeff
// @flow

const hexFromBn = require('../bn/toHex');

/**
  @name hexFromBn
  @signature hexFromBn (value?: BN): string
  @summary Creates a hex value from a BN.js bignumber object. [bn.md#bntohex](alias bnToHex)
  @description
    `null` inputs returns a `0x` result, BN values return the actual value as a `0x` prefixed hex value. Anything that is not a BN object throws an error.
  @example
    import BN from 'bn.js';
    import { hexFromBn } from '@polkadot/util';

    console.log('Hex value', hexFromBn(new BN(0x123456)); // '0x123456'
*/
module.exports = hexFromBn;
