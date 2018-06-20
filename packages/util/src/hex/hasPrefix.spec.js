// Copyright 2017-2018 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { hexHasPrefix } from './index';

describe('hexHasPrefix', () => {
  it('returns true when hex prefix is found', () => {
    expect(
      hexHasPrefix('0x123')
    ).toEqual(true);
  });

  it('returns false when no prefix attached', () => {
    expect(
      hexHasPrefix('123')
    ).toEqual(false);
  });

  it('returns false when null value supplied', () => {
    expect(
      hexHasPrefix(null)
    ).toEqual(false);
  });

  it('returns false when non-string value supplied', () => {
    expect(
      hexHasPrefix(false)
    ).toEqual(false);
  });
});
