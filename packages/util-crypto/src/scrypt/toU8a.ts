// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

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
