// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

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
