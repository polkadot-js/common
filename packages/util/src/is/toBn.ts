// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { ToBn } from '../types';

import isFunction from './function';

export default function isToBn (value?: unknown): value is ToBn {
  return !!value && isFunction((value as ToBn).toBn);
}
