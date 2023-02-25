// Copyright 2017-2023 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

// eslint-disable-next-line spaced-comment
/// <reference types="@polkadot/dev/node/test/node" />

import { hasBuffer } from './has';

describe('hasBuffer', (): void => {
  it('has Buffer (Jest + Node.js)', (): void => {
    expect(hasBuffer).toEqual(typeof Buffer !== 'undefined');
  });
});
