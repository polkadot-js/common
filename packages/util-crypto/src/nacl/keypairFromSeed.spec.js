// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const u8aFromString = require('@polkadot/util/u8a/fromString');
const u8aToHex = require('@polkadot/util/u8a/toHex');

const { naclKeypairFromSeed } = require('./index');

describe('naclKeypairFromSeed', () => {
  // NOTE: Aligned with Rust test, b"12345678901234567890123456789012"
  const TEST = '12345678901234567890123456789012';
  const RESULT = {
    publicKey: new Uint8Array([
      0x2f, 0x8c, 0x61, 0x29, 0xd8, 0x16, 0xcf, 0x51,
      0xc3, 0x74, 0xbc, 0x7f, 0x08, 0xc3, 0xe6, 0x3e,
      0xd1, 0x56, 0xcf, 0x78, 0xae, 0xfb, 0x4a, 0x65,
      0x50, 0xd9, 0x7b, 0x87, 0x99, 0x79, 0x77, 0xee
    ]),
    secretKey: new Uint8Array([
      49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 49, 50,
      // public part
      0x2f, 0x8c, 0x61, 0x29, 0xd8, 0x16, 0xcf, 0x51,
      0xc3, 0x74, 0xbc, 0x7f, 0x08, 0xc3, 0xe6, 0x3e,
      0xd1, 0x56, 0xcf, 0x78, 0xae, 0xfb, 0x4a, 0x65,
      0x50, 0xd9, 0x7b, 0x87, 0x99, 0x79, 0x77, 0xee
    ])
  };

  it('generates a valid publicKey/secretKey pair (string)', () => {
    expect(
      naclKeypairFromSeed(TEST)
    ).toEqual(RESULT);
  });

  it('generates a valid publicKey/secretKey pair (u8a)', () => {
    expect(
      naclKeypairFromSeed(
        u8aFromString(TEST)
      )
    ).toEqual(RESULT);
  });

  it('generates a valid publicKey/secretKey pair (hex)', () => {
    expect(
      naclKeypairFromSeed(
        u8aToHex(
          u8aFromString(TEST)
        )
      )
    ).toEqual(RESULT);
  });
});
