// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString, ToBigInt, ToBn } from '../types';

import { hexToBn } from '../hex/toBn';
import { isBigInt } from '../is/bigInt';
import { isHex } from '../is/hex';
import { isToBigInt } from '../is/toBigInt';
import { isToBn } from '../is/toBn';
import { BN } from './bn';

/**
 * @name bnToBn
 * @summary Creates a BN value from a BN, bigint, string (base 10 or hex) or number input.
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
export function bnToBn <ExtToBn extends ToBigInt | ToBn> (value?: HexString | ExtToBn | BN | bigint | string | number | null): BN {
  return BN.isBN(value)
    ? value
    : !value
      ? new BN(0)
      : isHex(value)
        ? hexToBn(value.toString())
        : isBigInt(value)
          ? new BN(value.toString())
          : isToBn(value)
            ? value.toBn()
            : isToBigInt(value)
              ? new BN(value.toBigInt().toString())
              : new BN(value);
}
