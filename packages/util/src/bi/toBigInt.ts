// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { BN } from '../bn/bn.js';
import type { ToBigInt, ToBn } from '../types.js';

import { BigInt } from '@polkadot/x-bigint';

import { hexToBigInt } from '../hex/toBigInt.js';
import { isBn } from '../is/bn.js';
import { isHex } from '../is/hex.js';
import { isToBigInt } from '../is/toBigInt.js';
import { isToBn } from '../is/toBn.js';

/**
 * @name nToBigInt
 * @summary Creates a bigInt value from a BN, bigint, string (base 10 or hex) or number input.
 */
export function nToBigInt <ExtToBn extends ToBigInt | ToBn> (value?: ExtToBn | BN | bigint | string | number | null): bigint {
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
