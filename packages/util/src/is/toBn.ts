// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ToBn } from '../types';

import { isFunction } from './function';

export function isToBn (value?: unknown): value is ToBn {
  return !!value && isFunction((value as ToBn).toBn);
}
