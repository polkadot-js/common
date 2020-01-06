// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { ToBn } from '../types';

import isFunction from './function';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function isToBn (value?: any): value is ToBn {
  return !!value && isFunction((value as ToBn).toBn);
}
