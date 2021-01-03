// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { u8aEq } from '.';

describe('u8aEq', (): void => {
  it('returns false when the lengths do not match', (): void => {
    expect(
      u8aEq(
        new Uint8Array([1, 2, 3]),
        new Uint8Array([1, 2])
      )
    ).toEqual(false);
  });

  it('returns false when the contents do not match', (): void => {
    expect(
      u8aEq(
        new Uint8Array([1, 2, 3]),
        new Uint8Array([1, 2, 4])
      )
    ).toEqual(false);
  });

  it('returns true when the contents do match', (): void => {
    expect(
      u8aEq(
        new Uint8Array([1, 2, 3]),
        new Uint8Array([1, 2, 3])
      )
    ).toEqual(true);
  });

  it('returns true with equalvalent hex & Uint8array', (): void => {
    expect(
      u8aEq(
        '0x010203',
        new Uint8Array([1, 2, 3])
      )
    ).toEqual(true);
  });
});
