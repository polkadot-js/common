// Copyright 2017-2023 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev/node/test/node" />

import { hasBuffer } from './has.js';

describe('hasBuffer', (): void => {
  it('has Buffer (Jest + Node.js)', (): void => {
    expect(hasBuffer).toEqual(typeof Buffer !== 'undefined');
  });
});
