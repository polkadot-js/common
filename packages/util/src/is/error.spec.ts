// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { isError } from '.';

describe('isError', (): void => {
  it('returns true when an Error value', (): void => {
    expect(
      isError(new Error('testing'))
    ).toEqual(true);
  });

  it('returns false on non-Error values', (): void => {
    expect(
      isError(0)
    ).toEqual(false);
  });
});
