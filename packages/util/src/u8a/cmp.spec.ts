// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { u8aCmp } from '.';

describe('u8aCmp', (): void => {
  it('has the same result as localCompare (equal length)', (): void => {
    const a = 'test abc';
    const b = 'test def';

    expect(
      u8aCmp(a, b)
    ).toEqual(a.localeCompare(b));
    expect(
      u8aCmp(b, a)
    ).toEqual(b.localeCompare(a));
  });

  it('has the same result as localCompare (diff length)', (): void => {
    const a = 'test';
    const b = 'test abc';

    expect(
      u8aCmp(a, b)
    ).toEqual(a.localeCompare(b));
    expect(
      u8aCmp(b, a)
    ).toEqual(b.localeCompare(a));
  });

  it('compares between string and Uint8Array', (): void => {
    expect(
      u8aCmp(
        '0x12345678',
        new Uint8Array([0x12, 0x34, 0x56, 0x78])
      )
    ).toEqual(0);
  });
});
