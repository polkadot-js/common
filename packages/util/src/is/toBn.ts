// Copyright 2017-2020 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ToBn } from '../types';

import { isFunction } from './function';

export function isToBn (value?: unknown): value is ToBn {
  return !!value && isFunction((value as ToBn).toBn);
}
