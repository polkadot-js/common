// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Memoized } from './types.js';

import { stringify } from './stringify.js';

interface Options {
  getInstanceId?: () => string;
}

function defaultGetId (): string {
  return 'none';
}

/**
 * @name memoize
 * @description Memomize the function with a specific instanceId
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function memoize <T, F extends (...args: any[]) => T> (fn: F, { getInstanceId = defaultGetId }: Options = {}): Memoized<F> {
  const cache: Record<string, Record<string, T>> = {};

  const memoized = (...args: unknown[]): T => {
    const stringParams = stringify(args);
    const instanceId = getInstanceId();

    if (!cache[instanceId]) {
      cache[instanceId] = {};
    }

    if (cache[instanceId][stringParams] === undefined) {
      cache[instanceId][stringParams] = fn(...args);
    }

    return cache[instanceId][stringParams];
  };

  memoized.unmemoize = (...args: unknown[]): void => {
    const stringParams = stringify(args);
    const instanceId = getInstanceId();

    if (cache[instanceId]?.[stringParams] !== undefined) {
      delete cache[instanceId][stringParams];
    }
  };

  return memoized as Memoized<F>;
}
