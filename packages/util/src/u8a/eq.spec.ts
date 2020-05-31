// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

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
