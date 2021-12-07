// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

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
});
