// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { stringPascalCase } from './index.js';

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
