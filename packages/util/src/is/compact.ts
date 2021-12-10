// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { BN } from '../bn/bn';

import { isOnObject } from './helpers';

interface Compact<T> {
  toBigInt (): bigint;
  toBn (): BN;
  toNumber (): number;
  unwrap (): T;
}

const checker = isOnObject('toBigInt', 'toBn', 'toNumber', 'unwrap');

/**
 * @name isCompact
 * @summary Tests for SCALE-Compact-like object instance.
 */
export function isCompact <T> (value?: unknown): value is Compact<T> {
  return checker(value);
}
