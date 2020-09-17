// Copyright 2017-2020 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ToBn } from '../types';

import isFunction from './function';

export default function isToBn (value?: unknown): value is ToBn {
  return !!value && isFunction((value as ToBn).toBn);
}
