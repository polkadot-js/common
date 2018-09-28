// Copyright 2017-2018 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { stringCamelCase } from './index';

describe('stringCamelCase', () => {
  it("works correctly", () => {
    expect(
      stringCamelCase('Snake_case')
    ).toBe('snakeCase');
  });
});
