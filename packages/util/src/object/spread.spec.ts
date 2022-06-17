// Copyright 2017-2022 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { performance } from '../test/performance';
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

  performance('objectSpread', 500_000, [[]], () => objectSpread({}, { a: 1, b: 2, c: 3 }, { d: 4, e: 7, f: 6 }));
});
