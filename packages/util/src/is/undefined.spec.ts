// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { isUndefined } from '.';

describe('isUndefined', (): void => {
  it('returns true on undefined values', (): void => {
    expect(
      isUndefined()
    ).toEqual(true);
  });

  it('returns false on defined values', (): void => {
    expect(
      isUndefined(null)
    ).toEqual(false);
  });
});
