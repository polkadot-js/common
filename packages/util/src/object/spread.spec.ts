// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { perf } from '../test/index.js';
import { objectSpread } from './index.js';

describe('objectSpread', (): void => {
  it('spreads obj sources', (): void => {
    expect(
      objectSpread({}, { a: 1, b: 2, c: 3 }, { d: 4, e: 5, f: 6 })
    ).toEqual({ a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 });
  });

  it('spreads map sources', (): void => {
    expect(
      objectSpread({}, new Map<string, number>([['a', 1], ['b', 2], ['c', 3]]), new Map<string, number>([['d', 4], ['e', 5], ['f', 6]]))
    ).toEqual({ a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 });
  });

  it('spreads an object from multiple sources', (): void => {
    expect(
      objectSpread({ a: 1 }, { b: 2 }, { a: 2, c: { d: 3, e: 4 } }, new Map<string, unknown>([['f', 5], ['g', 6], ['h', { i: 7, k: 8 }]]))
    ).toEqual({ a: 2, b: 2, c: { d: 3, e: 4 }, f: 5, g: 6, h: { i: 7, k: 8 } });
  });

  it('spreads an object from multiple sources (with null & undefined)', (): void => {
    expect(
      objectSpread({ a: 1 }, null, { b: 2 }, undefined, { a: 2, c: { d: 3, e: 4 } })
    ).toEqual({ a: 2, b: 2, c: { d: 3, e: 4 } });
  });

  perf('objectSpread (obj)', 350_000, [[{}, { a: 1, b: 2, c: 3 }, { d: 4, e: 5, f: 6 }]], objectSpread);
  perf('objectSpread (map)', 350_000, [[{}, new Map<string, number>([['a', 1], ['b', 2], ['c', 3]]), new Map<string, number>([['d', 4], ['e', 5], ['f', 6]])]], objectSpread);
});
