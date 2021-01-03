// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

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
