// Copyright 2017-2023 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev/node/test/node" />

import { assert } from '.';

describe('index', (): void => {
  it('exports ok', (): void => {
    expect(assert).toBeDefined();
  });
});
