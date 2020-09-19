// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { base64Pad } from '.';

describe('base64Pad', (): void => {
  it('pads a utf-8 string', (): void => {
    expect(
      base64Pad('aGVsbG8gd29ybGQg0J/RgNC40LLQtdGC0YHRgtCy0YPRjiDQvNC4IOS9oOWlvQ')
    ).toEqual('aGVsbG8gd29ybGQg0J/RgNC40LLQtdGC0YHRgtCy0YPRjiDQvNC4IOS9oOWlvQ==');
  });
});
