// Copyright 2017-2023 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev/node/test/node" />

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

  it('adjusts all-uppercase + digits', (): void => {
    expect(
      stringPascalCase('UUID64')
    ).toEqual('Uuid64');
  });
});
