// Copyright 2017-2020 @polkadot/util-rlp authors & contributors
// This software may be modified and distributed under the terms
// of the MPL-2.0 license. See the LICENSE file for details.

import encodeLength from './length';

describe('encodeLength', (): void => {
  it('returns offset + length where <= 55', (): void => {
    expect(
      encodeLength(5, 6)
    ).toEqual(
      new Uint8Array([11])
    );
  });

  it('encodes > 55 length properly (short)', (): void => {
    expect(
      encodeLength(56, 6)
    ).toEqual(
      new Uint8Array([62, 56])
    );
  });

  it('encodes > 55 length properly (long)', (): void => {
    expect(
      encodeLength(512, 6)
    ).toEqual(
      new Uint8Array([63, 2, 0])
    );
  });
});
