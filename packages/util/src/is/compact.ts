// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { BN } from '../bn/bn';

import { isFunction } from './function';

interface Compact<T> {
  toBigInt (): bigint;
  toBn (): BN;
  toNumber (): number;
  unwrap (): T;
}

/**
 * @name isCompact
 * @summary Tests for SCALE-Compact-like object instance.
 */
export function isCompact <T> (value: unknown): value is Compact<T> {
  return (
    isFunction((value as Compact<T>).toBigInt) &&
    isFunction((value as Compact<T>).toBn) &&
    isFunction((value as Compact<T>).toNumber) &&
    isFunction((value as Compact<T>).unwrap)
  );
}
