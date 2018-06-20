// Copyright 2017-2018 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import BN from 'bn.js';

/**
  @name isBn
  @signature isBN (value: mixed): boolean
  @summary Tests for a `BN` object instance.
  @description
    Checks to see if the input object is an instance of `BN` (bn.js).
  @example
    import BN from 'bn.js';
    import { isBn } from '@polkadot/util';

    console.log('isBn', isBn(new BN(1))); // => true
*/
export default function isBn (value: mixed): boolean {
  return BN.isBN(value);
}
