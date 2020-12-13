// Copyright 2017-2020 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Memoized } from './types';

import { isUndefined } from './is/undefined';

interface Options {
  getInstanceId?: () => string,
  normalize?: (args: any[]) => string;
}

const INSTANCEID = () => 'none';

export function memoize <T> (fn: (...args: any[]) => T, { getInstanceId = INSTANCEID }: Options = {}): Memoized<T> {
  const cache: Record<string, Record<string, T>> = {};

  const memoized = (...args: any[]): T => {
    const stringParams = JSON.stringify({ args });
    const instanceId = getInstanceId();

    if (!cache[instanceId]) {
      cache[instanceId] = {};
    }

    if (isUndefined(cache[instanceId][stringParams])) {
      cache[instanceId][stringParams] = fn(...args);
    }

    return cache[instanceId][stringParams];
  };

  memoized.unmemoize = (...args: any[]): void => {
    const stringParams = JSON.stringify({ args });
    const instanceId = getInstanceId();

    if (cache[instanceId] && !isUndefined(cache[instanceId][stringParams])) {
      delete cache[instanceId][stringParams];
    }
  };

  return memoized;
}
