// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { hexHasPrefix } from '.';

describe('hexHasPrefix', (): void => {
  it('returns true when hex prefix is found', (): void => {
    expect(
      hexHasPrefix('0x1234')
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
      hexHasPrefix(false as unknown as string)
    ).toEqual(false);
  });
});
