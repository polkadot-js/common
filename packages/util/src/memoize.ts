// Copyright 2017-2020 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Memoized } from './types';

import { isUndefined } from './is/undefined';

export function memoize <T> (fn: (...args: any[]) => T): Memoized<T> {
  const cache: Record<string, T> = {};

  const memoized = (...args: any[]): T => {
    const stringParams = JSON.stringify({ args });

    if (isUndefined(cache[stringParams])) {
      cache[stringParams] = fn(...args);
    }

    return cache[stringParams];
  };

  memoized.unmemoize = (...args: any[]): void => {
    const stringParams = JSON.stringify({ args });

    if (!isUndefined(cache[stringParams])) {
      delete cache[stringParams];
    }
  };

  return memoized;
}
