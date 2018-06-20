// Copyright 2017-2018 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { isFunction } from './index';

describe('isFunction', () => {
  it('returns true on valid functions', () => {
    expect(
      isFunction(isFunction)
    ).toEqual(true);
  });

  it('returns false on invalid functions', () => {
    expect(
      isFunction('notAFunction')
    ).toEqual(false);
  });
});
