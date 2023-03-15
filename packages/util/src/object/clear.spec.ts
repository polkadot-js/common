// Copyright 2017-2023 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/node.d.ts" />

import { objectClear } from './index.js';

describe('objectClear', (): void => {
  it('clears an object', (): void => {
    expect(
      objectClear({ a: 1, b: 2, c: { d: 3, e: 4 } })
    ).toEqual({});
  });
});
