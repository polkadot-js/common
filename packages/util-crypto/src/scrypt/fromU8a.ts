// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Params } from './types';

import { u8aToBn } from '@polkadot/util';

interface Result {
  params: Params,
  salt: Uint8Array;
}

export default function scryptFromU8a (data: Uint8Array): Result {
  const salt = data.subarray(0, 32);
  const N = u8aToBn(data.subarray(32 + 0, 32 + 4), { isLe: true }).toNumber();
  const p = u8aToBn(data.subarray(32 + 4, 32 + 8), { isLe: true }).toNumber();
  const r = u8aToBn(data.subarray(32 + 8, 32 + 12), { isLe: true }).toNumber();

  return { params: { N, p, r }, salt };
}
