// Copyright 2017-2018 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { u8aFromString } from '@polkadot/util/index';

import { naclSign, naclKeypairFromSeed } from './index';

describe('naclSign', () => {
  let secretKey;

  beforeEach(() => {
    secretKey = naclKeypairFromSeed(
      u8aFromString('12345678901234567890123456789012')
    ).secretKey;
  });

  it('returns a valid signature for the message', () => {
    expect(
      naclSign(
        new Uint8Array([0x61, 0x62, 0x63, 0x64]),
        secretKey
      )
    ).toEqual(
      new Uint8Array([28, 58, 206, 239, 249, 70, 59, 191, 166, 40, 219, 218, 235, 170, 25, 79, 10, 94, 9, 197, 34, 126, 1, 150, 246, 68, 28, 238, 36, 26, 172, 163, 168, 90, 202, 211, 126, 246, 57, 212, 43, 24, 88, 197, 240, 113, 118, 76, 37, 81, 91, 110, 236, 50, 144, 134, 100, 223, 220, 238, 34, 185, 211, 7])
    );
  });
});
