// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { BN } from '../bn/bn';
import type { HexString, ToBigInt } from '../types';

import { hexToBigInt } from '../hex/toBigInt';
import { isBn } from '../is/bn';
import { isHex } from '../is/hex';
import { isToBigInt } from '../is/toBigInt';
import { isToBn } from '../is/toBn';

/**
 * @name biToBigInt
 * @summary Creates a bigInt value from a BN, bigint, string (base 10 or hex) or number input.
 */
export function biToBigInt <ExtToBn extends ToBigInt> (value?: HexString | ExtToBn | BN | bigint | string | number | null): bigint {
  if (!value || value === '0x') {
    return BigInt(0);
  } else if (isHex(value)) {
    return hexToBigInt(value.toString());
  } else if (isBn(value)) {
    return BigInt(value.toString());
  } else if (isToBn(value)) {
    return BigInt(value.toBn().toString());
  }

  return typeof value === 'bigint'
    ? value
    : isToBigInt(value)
      ? value.toBigInt()
      : BigInt(value);
}
