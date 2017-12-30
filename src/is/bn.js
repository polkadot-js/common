// ISC, Copyright 2017 Jaco Greeff
// @flow

const BN = require('bn.js');

/**
  @name isBN
  @signature isBN (value: mixed): boolean
  @summary Tests for a `BN` object instance.
  @description
    Checks to see if the input object is an instance of `BN` (bn.js).
  @example
    import BN from 'bn.js';
    import { isBN } from '@polkadot/util';

    console.log('isBN', isBN(new BN(1))); // => true
*/
module.exports = function isBN (value: mixed): boolean {
  return BN.isBN(value);
};
