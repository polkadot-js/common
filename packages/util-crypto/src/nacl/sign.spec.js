// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const { naclSign, naclKeypairFromSeed } = require('./index');

describe('naclSign', () => {
  let secretKey;

  beforeEach(() => {
    secretKey = naclKeypairFromSeed(
      new Uint8Array([
        0x12, 0x34, 0x56, 0x78, 0x90, 0x12, 0x34, 0x56,
        0x78, 0x90, 0x12, 0x34, 0x56, 0x78, 0x90, 0x12,
        0x12, 0x34, 0x56, 0x78, 0x90, 0x12, 0x34, 0x56,
        0x78, 0x90, 0x12, 0x34, 0x56, 0x78, 0x90, 0x12
      ])
    ).secretKey;
  });

  it('returns a valid signature for the message', () => {
    expect(
      naclSign(
        new Uint8Array([0x61, 0x62, 0x63, 0x64]),
        secretKey
      )
    ).toEqual(
      new Uint8Array([
        209, 234, 164, 44, 182, 218, 103, 16, 205, 238, 97, 222, 123, 112, 2, 240, 24, 192, 26, 134, 11, 170, 167, 153, 141, 108, 187, 171, 241, 125, 226, 179, 244, 232, 131, 61, 44, 68, 87, 41, 141, 131, 88, 36, 175, 173, 57, 29, 12, 112, 26, 200, 247, 89, 14, 64, 224, 188, 211, 198, 233, 119, 158, 6
      ])
    );
  });
});
