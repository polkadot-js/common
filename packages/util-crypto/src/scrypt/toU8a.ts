// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Params } from './types';

import { bnToU8a, u8aConcat } from '@polkadot/util';

export default function scryptToU8a (salt: Uint8Array, { N, p, r }: Params): Uint8Array {
  return u8aConcat(
    salt,
    bnToU8a(N, { bitLength: 32, isLe: true }),
    bnToU8a(p, { bitLength: 32, isLe: true }),
    bnToU8a(r, { bitLength: 32, isLe: true })
  );
}
