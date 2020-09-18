// Copyright 2017-2020 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { stringCamelCase } from '.';

describe('stringCamelCase', (): void => {
  it('works correctly', (): void => {
    expect(
      stringCamelCase('Snake_case')
    ).toBe('snakeCase');
  });
});
