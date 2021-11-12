// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Params } from './types';

import { bnToU8a, u8aConcat } from '@polkadot/util';

import { BN_LE_32_OPTS } from '../bn';

export function scryptToU8a (salt: Uint8Array, { N, p, r }: Params): Uint8Array {
  return u8aConcat(
    salt,
    bnToU8a(N, BN_LE_32_OPTS),
    bnToU8a(p, BN_LE_32_OPTS),
    bnToU8a(r, BN_LE_32_OPTS)
  );
}
