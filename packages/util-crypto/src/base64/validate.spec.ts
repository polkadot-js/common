// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { base64Validate } from '.';

describe('base64Validate', (): void => {
  it('decodes a mixed base64 utf8 string', (): void => {
    expect(
      () => base64Validate('aGVsbG8gd29ybGQg0J/RgNC40LLQtd^GC0YHRgtCy0YPRjiDQvNC4IOS9oOWlvQ==')
    ).toThrow(/Invalid base64 encoding/);
  });
});
