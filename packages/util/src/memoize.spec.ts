// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { memoize } from './index.js';

describe('memoize', (): void => {
  it('returns actual values', (): void => {
    const fn = memoize(() => 5);

    expect(fn()).toEqual(5);
  });

  it('caches executions', (): void => {
    const spy = jest.fn((a: number, b: number) => a + b);
    const fn = memoize(spy);

    expect(fn(2, 4)).toEqual(6);
    expect(fn(2, 4)).toEqual(6);

    expect(spy).toHaveBeenCalledTimes(1);

    expect(fn(4, 2)).toEqual(6);

    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('does unmemoize', (): void => {
    const spy = jest.fn((a: number, b: number) => a + b);
    const fn = memoize(spy);

    expect(fn(2, 4)).toEqual(6);
    expect(fn(4, 2)).toEqual(6);
    expect(spy).toHaveBeenCalledTimes(2);

    fn.unmemoize(2, 4);

    expect(fn(2, 4)).toEqual(6);
    expect(fn(4, 2)).toEqual(6);
    expect(spy).toHaveBeenCalledTimes(3);
  });

  it('manages separate instances', (): void => {
    let instanceId = 'a';
    const spy = jest.fn((a: number, b: number) => a + b);
    const fn = memoize(spy, { getInstanceId: () => instanceId });

    expect(fn(1, 3)).toEqual(4);

    instanceId = 'b';

    expect(fn(1, 3)).toEqual(4);
    expect(spy).toHaveBeenCalledTimes(2);

    instanceId = 'a';

    expect(fn(1, 3)).toEqual(4);
    expect(spy).toHaveBeenCalledTimes(2);

    instanceId = 'b';
    fn.unmemoize(1, 3);

    expect(fn(1, 3)).toEqual(4);
    expect(spy).toHaveBeenCalledTimes(3);

    instanceId = 'a';
    fn.unmemoize(1, 3);

    expect(fn(1, 3)).toEqual(4);
    expect(spy).toHaveBeenCalledTimes(4);
  });

  it('normalizes BigInt values as well', (): void => {
    const fn = memoize((a: bigint, b: bigint) => a + b);

    expect(fn(1n, 2n).toString()).toEqual('3');
  });
});
