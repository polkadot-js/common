// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '../types';

import { u8aToHex } from '../u8a/toHex';
import { hexToU8a } from './toU8a';

export function reverseHex (value: string): string {
  return (value.match(/.{1,2}/g) || [])
    .reverse()
    .join('');
}

export function twoComplement (value: Uint8Array): Uint8Array {
  const result = new Uint8Array(value.length);

  for (let i = 0; i < value.length; i++) {
    result[i] = 0xff - value[i];
  }

  return result;
}

export function hexToBigInt2s (value: HexString): bigint {
  return (BigInt(u8aToHex(twoComplement(hexToU8a(value)))) * -1n) - 1n;
}
