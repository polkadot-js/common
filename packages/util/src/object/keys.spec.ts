// Copyright 2017-2023 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev/node/test/node" />

import { objectKeys } from './index.js';

describe('objectKeys', (): void => {
  it('extracts all keys', (): void => {
    const o = { a: 1, b: 2, c: 3 };
    const keys = objectKeys(o);

    expect(keys).toEqual(['a', 'b', 'c']);

    for (const k of keys) {
      expect(o[k]).toBeDefined();
    }
  });
});
