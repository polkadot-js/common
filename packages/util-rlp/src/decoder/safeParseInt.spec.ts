// Copyright 2017-2020 @polkadot/util-rlp authors & contributors
// This software may be modified and distributed under the terms
// of the MPL-2.0 license. See the LICENSE file for details.

import safeParseInt from './safeParseInt';

describe('safeParseInt', (): void => {
  it('does not allow 0 in first position', (): void => {
    expect(
      (): number => safeParseInt(
        new Uint8Array([0])
      )
    ).toThrow(/invalid rlp, extra zeros found/);
  });

  it('converts a value to the correct number', (): void => {
    expect(
      safeParseInt(
        new Uint8Array([0x12, 0x34, 0x56])
      )
    ).toEqual(0x123456);
  });
});
