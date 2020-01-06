// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { isNumber } from '.';

describe('isNumber', (): void => {
  it('returns true on valid numbers', (): void => {
    expect(
      isNumber(2)
    ).toEqual(true);
  });

  it('returns false on invalid numbers', (): void => {
    expect(
      isNumber('2')
    ).toEqual(false);
  });
});
