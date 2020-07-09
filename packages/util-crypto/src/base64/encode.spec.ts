// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { base64Encode } from '.';

describe('base64Encode', (): void => {
  it('encodes a mixed base64 utf8 string', (): void => {
    expect(
      base64Encode('hello world Приветствую ми 你好')
    ).toEqual('aGVsbG8gd29ybGQg0J/RgNC40LLQtdGC0YHRgtCy0YPRjiDQvNC4IOS9oOWlvQ==');
  });
});
