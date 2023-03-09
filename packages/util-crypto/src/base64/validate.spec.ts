// Copyright 2017-2023 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev/node/test/node" />

import { base64Validate } from './index.js';

describe('base64Validate', (): void => {
  it('validates a mixed base64 utf8 string', (): void => {
    expect(
      () => base64Validate('aGVsbG8gd29ybGQg0J/RgNC40LLQtd^GC0YHRgtCy0YPRjiDQvNC4IOS9oOWlvQ==')
    ).toThrow(/Invalid base64 character "\^" \(0x5e\) at index 30/);
  });
});
