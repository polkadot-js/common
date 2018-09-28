// Copyright 2017-2018 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { stringUpperFirst } from '.';

describe('stringUpperFirst', () => {
  it("lowers the first letter if it's a capital letter", () => {
    expect(
      stringUpperFirst('ABC')
    ).toBe('ABC');
  });

  it("lowers the first letter if it's a lowercase letter", () => {
    expect(
      stringUpperFirst('abc')
    ).toBe('Abc');
  });

  it('returns undefined as undefined', () => {
    expect(
      stringUpperFirst()
    ).toBe(undefined);
  });

  it('returns null as null', () => {
    expect(
      stringUpperFirst(null)
    ).toBe(null);
  });
});
