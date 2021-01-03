// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Memoized } from './types';

import { isBigInt } from './is/bigInt';
import { isUndefined } from './is/undefined';

interface Options {
  getInstanceId?: () => string;
}

function defaultGetId (): string {
  return 'none';
}

function normalize (args: unknown[]): string {
  return JSON.stringify(args, (_, value: unknown) =>
    isBigInt(value)
      ? value.toString()
      : value
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function memoize <T, F extends (...args: any[]) => T> (fn: F, { getInstanceId = defaultGetId }: Options = {}): Memoized<F> {
  const cache: Record<string, Record<string, T>> = {};

  const memoized = (...args: unknown[]): T => {
    const stringParams = normalize(args);
    const instanceId = getInstanceId();

    if (!cache[instanceId]) {
      cache[instanceId] = {};
    }

    if (isUndefined(cache[instanceId][stringParams])) {
      cache[instanceId][stringParams] = fn(...args);
    }

    return cache[instanceId][stringParams];
  };

  memoized.unmemoize = (...args: unknown[]): void => {
    const stringParams = normalize(args);
    const instanceId = getInstanceId();

    if (cache[instanceId] && !isUndefined(cache[instanceId][stringParams])) {
      delete cache[instanceId][stringParams];
    }
  };

  return memoized as Memoized<F>;
}
