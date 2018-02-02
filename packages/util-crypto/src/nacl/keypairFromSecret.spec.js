// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const u8aFromHex = require('@polkadot/util/u8a/fromHex');

const { naclKeypairFromSecret } = require('./index');

describe('naclKeypairFromSecret', () => {
  it('generates a valid publicKey/secretKey pair', () => {
    // NOTE: From Rust "9d61b19deffd5a60ba844af492ec2cc44449c5697b326919703bac031cae7f60"
    expect(
      naclKeypairFromSecret(
        u8aFromHex(
          '0x9d61b19deffd5a60ba844af492ec2cc44449c5697b326919703bac031cae7f60'
        )
      )
    ).toEqual({
      // Note: From Rust "d75a980182b10ab7d54bfed3c964073a0ee172f3daa62325af021a68f707511a"
      publicKey: new Uint8Array([
        0xd7, 0x5a, 0x98, 0x01, 0x82, 0xb1, 0x0a, 0xb7,
        0xd5, 0x4b, 0xfe, 0xd3, 0xc9, 0x64, 0x07, 0x3a,
        0x0e, 0xe1, 0x72, 0xf3, 0xda, 0xa6, 0x23, 0x25,
        0xaf, 0x02, 0x1a, 0x68, 0xf7, 0x07, 0x51, 0x1a
      ]),
      secretKey: new Uint8Array([
        157, 97, 177, 157, 239, 253, 90, 96, 186, 132, 74, 244, 146, 236, 44, 196, 68, 73, 197, 105, 123, 50, 105, 25, 112, 59, 172, 3, 28, 174, 127, 96,
        // public part
        0xd7, 0x5a, 0x98, 0x01, 0x82, 0xb1, 0x0a, 0xb7,
        0xd5, 0x4b, 0xfe, 0xd3, 0xc9, 0x64, 0x07, 0x3a,
        0x0e, 0xe1, 0x72, 0xf3, 0xda, 0xa6, 0x23, 0x25,
        0xaf, 0x02, 0x1a, 0x68, 0xf7, 0x07, 0x51, 0x1a
      ])
    });
  });
});

// NOTE: Original, non-fixed-to-Rust version
// describe('naclKeypairFromSecret', () => {
//   const secretKey = new Uint8Array([
//     18, 52, 86, 120, 144, 18, 52, 86,
//     120, 144, 18, 52, 86, 120, 144, 18,
//     18, 52, 86, 120, 144, 18, 52, 86,
//     120, 144, 18, 52, 86, 120, 144, 18,
//     180, 114, 93, 155, 165, 255, 217, 82,
//     16, 250, 209, 11, 193, 10, 88, 218,
//     190, 190, 41, 193, 236, 252, 1, 152,
//     216, 214, 0, 41, 45, 138, 13, 53
//   ]);
//
//   it('generates a valid publicKey/secretKey pair', () => {
//     expect(
//       naclKeypairFromSecret(secretKey)
//     ).toEqual({
//       publicKey: new Uint8Array([
//         180, 114, 93, 155, 165, 255, 217, 82,
//         16, 250, 209, 11, 193, 10, 88, 218,
//         190, 190, 41, 193, 236, 252, 1, 152,
//         216, 214, 0, 41, 45, 138, 13, 53
//       ]),
//       secretKey
//     });
//   });
// });
