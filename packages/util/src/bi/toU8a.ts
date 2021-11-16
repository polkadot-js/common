// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { BN } from '../bn/bn';
import type { ToBigInt, ToBn, ToBnOptions } from '../types';

import { objectSpread } from '../object/spread';
import { biToBigInt } from './toBigInt';

interface Options extends ToBnOptions {
  bitLength?: number;
}

const DIV = 256n;

function createEmpty ({ bitLength = 0 }: Options): Uint8Array {
  return bitLength === -1
    ? new Uint8Array()
    : new Uint8Array(Math.ceil(bitLength / 8));
}

function toU8a (value: bigint, { isLe, isNegative }: Options): Uint8Array {
  const arr: number[] = [];

  if (isNegative) {
    value = (value + 1n) * -1n;
  }

  while (value !== 0n) {
    const mod = value % DIV;
    const val = Number(
      isNegative
        ? mod ^ 0xffn
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
 * @name biToU8a
 * @summary Creates a Uint8Array object from a bigint.
 */
export function biToU8a <ExtToBn extends ToBn | ToBigInt> (value?: ExtToBn | BN | bigint | number | null, options?: Options): Uint8Array {
  const opts: Options = objectSpread(
    { bitLength: -1, isLe: true, isNegative: false },
    options
  );

  const valueBi = biToBigInt(value);

  if (valueBi === 0n) {
    return createEmpty(opts);
  }

  const u8a = toU8a(valueBi, opts);

  if (opts.bitLength === -1) {
    return u8a;
  }

  const byteLength = Math.ceil((opts.bitLength || 0) / 8);
  const output = new Uint8Array(byteLength);

  if (opts.isNegative) {
    output.fill(0xff);
  }

  output.set(u8a, opts.isLe ? 0 : byteLength - u8a.length);

  return output;
}
