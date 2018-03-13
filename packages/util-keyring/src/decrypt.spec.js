// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const index = require('./index');

describe('decrypt', () => {
  const publicKey = new Uint8Array([47, 140, 97, 41, 216, 22, 207, 81, 195, 116, 188, 127, 8, 195, 230, 62, 209, 86, 207, 120, 174, 251, 74, 101, 80, 217, 123, 135, 153, 121, 119, 238]);
  const seedOne = '12345678901234567890123456789012';
  let keypair;
  let encrypted;

  beforeEach(() => {
    keypair = index();

    keypair.addFromSeed(seedOne);
    encrypted = keypair.encrypt(publicKey, 'test');

    keypair = index();
  });

  it('decrypts a previously encrypted', () => {
    expect(
      keypair.decrypt(encrypted, 'test')
    ).toMatchObject({
      publicKey
    });
  });
});
