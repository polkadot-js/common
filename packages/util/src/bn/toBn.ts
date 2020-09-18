// Copyright 2017-2020 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ToBn } from '../types';

import BN from 'bn.js';

import isBigInt from '../is/bigInt';
import isToBn from '../is/toBn';
import isHex from '../is/hex';
import hexToBn from '../hex/toBn';

/**
 * @name bnToBn
 * @summary Creates a BN value from a BN, BigInt, string (base 10 or hex) or number input.
 * @description
 * `null` inputs returns a `0x0` result, BN values returns the value, numbers returns a BN representation.
 * @example
 * <BR>
 *
 * ```javascript
 * import BN from 'bn.js';
 * import { bnToBn } from '@polkadot/util';
 *
 * bnToBn(0x1234); // => BN(0x1234)
 * bnToBn(new BN(0x1234)); // => BN(0x1234)
 * ```
 */
export default function bnToBn <ExtToBn extends ToBn> (value?: ExtToBn | BN | BigInt | string | number | null): BN {
  if (!value) {
    return new BN(0);
  } else if (isHex(value)) {
    return hexToBn(value.toString());
  } else if (isBigInt(value)) {
    return new BN(value.toString());
  }

  return BN.isBN(value)
    ? value
    : isToBn(value)
      ? value.toBn()
      : new BN(value);
}
