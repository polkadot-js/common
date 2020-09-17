// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { stringToU8a } from '@polkadot/util';

import { base64Decode } from '.';

describe('base64Decode', (): void => {
  it('decodes a mixed base64 utf8 string', (): void => {
    expect(
      base64Decode('aGVsbG8gd29ybGQg0J/RgNC40LLQtdGC0YHRgtCy0YPRjiDQvNC4IOS9oOWlvQ==')
    ).toEqual(
      stringToU8a('hello world Приветствую ми 你好')
    );
  });
});
