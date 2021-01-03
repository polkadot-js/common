// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { stringCamelCase } from '.';

describe('stringCamelCase', (): void => {
  it('works correctly', (): void => {
    expect(
      stringCamelCase('Snake_case')
    ).toBe('snakeCase');
  });

  it('works correctly for String (class', (): void => {
    expect(
      stringCamelCase(String('Snake_case'))
    ).toBe('snakeCase');
  });
});
