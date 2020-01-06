// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { stringCamelCase } from '.';

describe('stringCamelCase', (): void => {
  it('works correctly', (): void => {
    expect(
      stringCamelCase('Snake_case')
    ).toBe('snakeCase');
  });
});
