// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { objectClear } from '.';

describe('objectClear', (): void => {
  it('clears an object', (): void => {
    expect(
      objectClear({ a: 1, b: 2, c: { d: 3, e: 4 } })
    ).toEqual({});
  });
});
