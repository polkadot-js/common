// Copyright 2017-2018 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { stringLowerFirst } from './index';

describe('stringLowerFirst', () => {
  it("lowers the first letter if it's a capital letter", () => {
    expect(
      stringLowerFirst('ABC')
    ).toBe('aBC');
  });

  it("lowers the first letter if it's a lowercase letter", () => {
    expect(
      stringLowerFirst('abc')
    ).toBe('abc');
  });

  it('returns undefined as undefined', () => {
    expect(
      stringLowerFirst()
    ).toBe(undefined);
  });

  it('returns null as null', () => {
    expect(
      stringLowerFirst(null)
    ).toBe(null);
  });
});
