// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { base64Validate } from '.';

describe('base64Validate', (): void => {
  it('validates a mixed base64 utf8 string', (): void => {
    expect(
      () => base64Validate('aGVsbG8gd29ybGQg0J/RgNC40LLQtd^GC0YHRgtCy0YPRjiDQvNC4IOS9oOWlvQ==')
    ).toThrow(/Invalid base64 encoding/);
  });
});
