// Copyright 2017-2022 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { BN } from '../bn/bn';

import { isOnObject } from './helpers';

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
export const isCompact: <T> (value?: unknown) => value is Compact<T> = /*#__PURE__*/ isOnObject('toBigInt', 'toBn', 'toNumber', 'unwrap');
