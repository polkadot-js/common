// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { stringUpperFirst } from '.';

describe('stringUpperFirst', (): void => {
  it("uppers the first letter if it's a capital letter", (): void => {
    expect(
      stringUpperFirst('ABC')
    ).toBe('ABC');
  });

  it("uppers the first letter if it's a lowercase letter", (): void => {
    expect(
      stringUpperFirst('abc')
    ).toBe('Abc');
  });

  it('returns undefined as empty', (): void => {
    expect(
      stringUpperFirst()
    ).toBe('');
  });

  it('returns null as empty', (): void => {
    expect(
      stringUpperFirst(null)
    ).toBe('');
  });
});
