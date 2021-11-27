// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { base64Decode } from './base64';

describe('base64Decode', (): void => {
  it('decodes a mixed base64 utf8 string (1)', (): void => {
    expect(
      base64Decode('aGVsbG8gd29ybGQg0J/RgNC40LLQtdGC0YHRgtCy0YPRjiDQvNC4IOS9oOWlvQ==')
    ).toEqual(
      // hello world Приветствую ми 你好
      new Uint8Array([
        104, 101, 108, 108, 111, 32, 119, 111,
        114, 108, 100, 32, 208, 159, 209, 128,
        208, 184, 208, 178, 208, 181, 209, 130,
        209, 129, 209, 130, 208, 178, 209, 131,
        209, 142, 32, 208, 188, 208, 184, 32,
        228, 189, 160, 229, 165, 189
      ])
    );
  });

  it('decodes a mixed base64 utf8 string (2)', (): void => {
    expect(
      base64Decode('4pyTIMOgIGxhIG1vZGU=')
    ).toEqual(
      // ✓ à la mode
      new Uint8Array([
        226, 156, 147, 32, 195,
        160, 32, 108, 97, 32,
        109, 111, 100, 101
      ])
    );
  });

  it('decodes a mixed base64 utf8 string (3)', (): void => {
    expect(
      base64Decode('SGVsbG8gV29ybGQh')
    ).toEqual(
      // Hello World!
      new Uint8Array([
        72, 101, 108, 108, 111,
        32, 87, 111, 114, 108,
        100, 33
      ])
    );
  });
});
