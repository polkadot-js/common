// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ToBigInt } from '../types';

import { isFunction } from './function';

export function isToBigInt (value?: unknown): value is ToBigInt {
  return !!value && isFunction((value as ToBigInt).toBigInt);
}
