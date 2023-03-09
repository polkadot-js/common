// Copyright 2017-2023 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev/node/test/node" />

import { objectCopy } from './index.js';

describe('objectCopy', (): void => {
  it('makes a shallow copy of the object', (): void => {
    const a = { a: 1, b: 2, c: { d: 3, e: 4 } };
    const b = objectCopy(a);

    expect(a).toEqual(b);
    expect(a === b).toEqual(false);
    expect(a.c === b.c).toEqual(true);
  });
});
