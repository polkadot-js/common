// Copyright 2017-2018 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import BN from 'bn.js';

import hexFixLength from '../hex/fixLength';
import bnToBn from './toBn';

const ZERO_STR = '0x00';

/**
  @name bnToHex
  @signature bnToHex (value?: BN, bitLength: number = -1): string
  @summary Creates a hex value from a BN.js bignumber object.
  @description
    `null` inputs returns a `0x` result, BN values return the actual value as a `0x` prefixed hex value. Anything that is not a BN object throws an error. With `bitLength` set, it fixes the number to the specified length.
  @example
    import BN from 'bn.js';
    import { bnToHex } from '@polkadot/util';

    bnToHex(new BN(0x123456)); // => '0x123456'
*/
export default function bnToHex (value?: BN | number, bitLength: number = -1): string {
  // flowlint-next-line sketchy-null-number:off
  if (!value) {
    return ZERO_STR;
  }

  return hexFixLength(bnToBn(value).toString(16), bitLength, true);
}
