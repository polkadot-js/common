// Copyright 2017-2024 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { base64Encode } from './index.js';

describe('base64Encode', (): void => {
  it('encodes a mixed base64 utf8 string', (): void => {
    expect(
      base64Encode('hello world Приветствую ми 你好')
    ).toEqual('aGVsbG8gd29ybGQg0J/RgNC40LLQtdGC0YHRgtCy0YPRjiDQvNC4IOS9oOWlvQ==');
  });
});
