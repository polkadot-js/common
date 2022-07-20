// Copyright 2017-2022 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { perf } from '../test/performance';
import { objectSpread } from '.';

describe('objectSpread', (): void => {
  it('spreads an object from multiple sources', (): void => {
    expect(
      objectSpread({ a: 1 }, { b: 2 }, { a: 2, c: { d: 3, e: 4 } })
    ).toEqual({ a: 2, b: 2, c: { d: 3, e: 4 } });
  });

  it('spreads an object from multiple sources (with null & undefined)', (): void => {
    expect(
      objectSpread({ a: 1 }, null, { b: 2 }, undefined, { a: 2, c: { d: 3, e: 4 } })
    ).toEqual({ a: 2, b: 2, c: { d: 3, e: 4 } });
  });

  it('spreads a Map', (): void => {
    const map = new Map<string, string>([['foo', '123']]);

    expect(
      objectSpread({ bar: '123' }, map)
    ).toEqual({
      bar: '123',
      foo: '123'
    });
  });

  perf('objectSpread', 350_000, [[{}, { a: 1, b: 2, c: 3 }, { d: 4, e: 7, f: 6 }]], objectSpread);
  perf('objectSpread', 350_000, [[{}, new Map<string, number>([['a', 1], ['b', 2], ['c', 3]]), new Map<string, number>([['d', 4], ['e', 5], ['f', 6]])]], objectSpread);
});
