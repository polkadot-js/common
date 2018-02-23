// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const keyring = require('./testing')();

// aligned with @polkadot/util-crypto tests
describe('pair', () => {
  const SIGNATURE = new Uint8Array([28, 58, 206, 239, 249, 70, 59, 191, 166, 40, 219, 218, 235, 170, 25, 79, 10, 94, 9, 197, 34, 126, 1, 150, 246, 68, 28, 238, 36, 26, 172, 163, 168, 90, 202, 211, 126, 246, 57, 212, 43, 24, 88, 197, 240, 113, 118, 76, 37, 81, 91, 110, 236, 50, 144, 134, 100, 223, 220, 238, 34, 185, 211, 7]);

  it('has a publicKey', () => {
    expect(
      keyring.one.publicKey
    ).toEqual(
      new Uint8Array([47, 140, 97, 41, 216, 22, 207, 81, 195, 116, 188, 127, 8, 195, 230, 62, 209, 86, 207, 120, 174, 251, 74, 101, 80, 217, 123, 135, 153, 121, 119, 238])
    );
  });

  it('allows signing', () => {
    expect(
      keyring.one.sign(
        new Uint8Array([0x61, 0x62, 0x63, 0x64])
      )
    ).toEqual(SIGNATURE);
  });

  it('validates a correctly signed message', () => {
    expect(
      keyring.one.verify(
        new Uint8Array([0x61, 0x62, 0x63, 0x64]),
        SIGNATURE
      )
    ).toEqual(true);
  });

  it('fails a correctly signed message (message changed)', () => {
    expect(
      keyring.one.verify(
        new Uint8Array([0x61, 0x62, 0x63, 0x64, 0x65]),
        SIGNATURE
      )
    ).toEqual(false);
  });
});
