// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { hasBigInt } from '../has';

export function newBigInt (n: bigint | number | string): bigint {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return hasBigInt
    ? BigInt(n)
    : undefined;
}
