// Copyright 2017-2023 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev/node/test/node" />

import { objectEntries } from './index.js';

describe('objectEntries', (): void => {
  it('extracts all entries', (): void => {
    const o = { a: 1, b: 2, c: 3 };
    const entries = objectEntries(o);

    expect(entries).toEqual([['a', 1], ['b', 2], ['c', 3]]);

    for (const [k, v] of entries) {
      expect(k).toBeDefined();
      expect(v).toBeDefined();
    }
  });
});
