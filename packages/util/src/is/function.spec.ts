// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { isFunction } from '.';

describe('isFunction', (): void => {
  it('returns true on valid functions', (): void => {
    expect(
      isFunction(isFunction)
    ).toEqual(true);
  });

  it('returns false on invalid functions', (): void => {
    expect(
      isFunction('notAFunction')
    ).toEqual(false);
  });
});
