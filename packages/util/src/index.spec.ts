// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { assert } from './index.js';

describe('index', (): void => {
  it('exports ok', (): void => {
    expect(assert).toBeDefined();
  });
});
