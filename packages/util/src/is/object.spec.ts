// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { isObject } from '.';

describe('isObject', (): void => {
  it('returns true on valid objects', (): void => {
    expect(
      isObject({})
    ).toEqual(true);
  });

  it('returns false on invalid objects', (): void => {
    expect(
      isObject('notAnObject')
    ).toEqual(false);
  });
});
