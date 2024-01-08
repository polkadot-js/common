// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { hasBuffer } from './has.js';

describe('hasBuffer', (): void => {
  it('has Buffer (Jest + Node.js)', (): void => {
    expect(hasBuffer).toEqual(typeof Buffer !== 'undefined');
  });
});
