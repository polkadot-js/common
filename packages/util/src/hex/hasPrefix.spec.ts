// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { hexHasPrefix } from '.';

describe('hexHasPrefix', (): void => {
  it('returns true when hex prefix is found', (): void => {
    expect(
      hexHasPrefix('0x123')
    ).toEqual(true);
  });

  it('returns false when no prefix attached', (): void => {
    expect(
      hexHasPrefix('123')
    ).toEqual(false);
  });

  it('returns false when null value supplied', (): void => {
    expect(
      hexHasPrefix(null)
    ).toEqual(false);
  });

  it('returns false when non-string value supplied', (): void => {
    expect(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      hexHasPrefix(false as any)
    ).toEqual(false);
  });
});
