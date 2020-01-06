// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { stringLowerFirst } from '.';

describe('stringLowerFirst', (): void => {
  it("lowers the first letter if it's a capital letter", (): void => {
    expect(
      stringLowerFirst('ABC')
    ).toBe('aBC');
  });

  it("lowers the first letter if it's a lowercase letter", (): void => {
    expect(
      stringLowerFirst('abc')
    ).toBe('abc');
  });

  it('returns undefined as empty', (): void => {
    expect(
      stringLowerFirst()
    ).toBe('');
  });

  it('returns null as empty', (): void => {
    expect(
      stringLowerFirst(null)
    ).toBe('');
  });
});
