// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { objectValues } from './index.js';

describe('objectValues', (): void => {
  it('extracts all values', (): void => {
    const o = { a: 1, b: 2, c: 3 };
    const values = objectValues(o);

    expect(values).toEqual([1, 2, 3]);

    for (const v of values) {
      expect(v).toBeDefined();
    }
  });
});
