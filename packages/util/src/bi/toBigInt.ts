// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { BN } from '../bn/bn';
import type { HexString, ToBigInt, ToBn } from '../types';

import { BigInt } from '@polkadot/x-bigint';

import { hexToBigInt } from '../hex/toBigInt';
import { isBn } from '../is/bn';
import { isHex } from '../is/hex';
import { isToBigInt } from '../is/toBigInt';
import { isToBn } from '../is/toBn';

/**
 * @name nToBigInt
 * @summary Creates a bigInt value from a BN, bigint, string (base 10 or hex) or number input.
 */
export function nToBigInt <ExtToBn extends ToBigInt | ToBn> (value?: HexString | ExtToBn | BN | bigint | string | number | null): bigint {
  return typeof value === 'bigint'
    ? value
    : !value
      ? BigInt(0)
      : isHex(value)
        ? hexToBigInt(value.toString())
        : isBn(value)
          ? BigInt(value.toString())
          : isToBigInt(value)
            ? value.toBigInt()
            : isToBn(value)
              ? BigInt(value.toBn().toString())
              : BigInt(value);
}
