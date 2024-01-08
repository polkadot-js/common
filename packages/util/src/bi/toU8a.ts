// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { BN } from '../bn/bn.js';
import type { NumberOptions, ToBigInt, ToBn } from '../types.js';

import { BigInt } from '@polkadot/x-bigint';

import { _0n, _1n } from './consts.js';
import { nToBigInt } from './toBigInt.js';

const DIV = BigInt(256);
const NEG_MASK = BigInt(0xff);

function toU8a (value: bigint, isLe: boolean, isNegative: boolean): Uint8Array {
  const arr: number[] = [];
  const withSigned = isNegative && (value < _0n);

  if (withSigned) {
    value = (value + _1n) * -_1n;
  }

  while (value !== _0n) {
    const mod = value % DIV;
    const val = Number(
      withSigned
        ? mod ^ NEG_MASK
        : mod
    );

    if (isLe) {
      arr.push(val);
    } else {
      arr.unshift(val);
    }

    value = (value - mod) / DIV;
  }

  return Uint8Array.from(arr);
}

/**
 * @name nToU8a
 * @summary Creates a Uint8Array object from a bigint.
 */
export function nToU8a <ExtToBn extends ToBn | ToBigInt> (value?: ExtToBn | BN | bigint | number | null, { bitLength = -1, isLe = true, isNegative = false }: NumberOptions = {}): Uint8Array {
  const valueBi = nToBigInt(value);

  if (valueBi === _0n) {
    return bitLength === -1
      ? new Uint8Array(1)
      : new Uint8Array(Math.ceil((bitLength || 0) / 8));
  }

  const u8a = toU8a(valueBi, isLe, isNegative);

  if (bitLength === -1) {
    return u8a;
  }

  const byteLength = Math.ceil((bitLength || 0) / 8);
  const output = new Uint8Array(byteLength);

  if (isNegative) {
    output.fill(0xff);
  }

  output.set(u8a, isLe ? 0 : byteLength - u8a.length);

  return output;
}
