// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { isBoolean } from '.';

describe('isBoolean', (): void => {
  it('returns true on false', (): void => {
    expect(
      isBoolean(false)
    ).toEqual(true);
  });

  it('returns true on true', (): void => {
    expect(
      isBoolean(true)
    ).toEqual(true);
  });

  it('returns false on invalid booleans', (): void => {
    expect(
      isBoolean('notABool')
    ).toEqual(false);
  });
});
