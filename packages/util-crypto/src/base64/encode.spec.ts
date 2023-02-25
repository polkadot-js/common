// Copyright 2017-2023 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

// eslint-disable-next-line spaced-comment
/// <reference types="@polkadot/dev/node/test/node" />

import { base64Encode } from '.';

describe('base64Encode', (): void => {
  it('encodes a mixed base64 utf8 string', (): void => {
    expect(
      base64Encode('hello world Приветствую ми 你好')
    ).toEqual('aGVsbG8gd29ybGQg0J/RgNC40LLQtdGC0YHRgtCy0YPRjiDQvNC4IOS9oOWlvQ==');
  });
});
