// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { isFunction } from './function';
import { isObject } from './object';

export function isOn <T> (fn: keyof T): (value?: unknown) => value is T {
  return (value?: unknown): value is T =>
    !!value && (isObject(value) || isFunction(value)) && isFunction((value as T)[fn]);
}
