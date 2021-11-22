// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { stringPascalCase } from '.';

describe('stringPascalCase', (): void => {
  it('works correctly', (): void => {
    expect(
      stringPascalCase('Snake_case-something  spaced')
    ).toBe('SnakeCaseSomethingSpaced');
  });

  it('works correctly for String (class)', (): void => {
    expect(
      stringPascalCase(String('foo_bar--  __baz Bob'))
    ).toBe('FooBarBazBob');
  });
});
