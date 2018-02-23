// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const index = require('./index');

describe('keypair', () => {
  const publicKeyOne = new Uint8Array([47, 140, 97, 41, 216, 22, 207, 81, 195, 116, 188, 127, 8, 195, 230, 62, 209, 86, 207, 120, 174, 251, 74, 101, 80, 217, 123, 135, 153, 121, 119, 238]);
  const publicKeyTwo = new Uint8Array([215, 90, 152, 1, 130, 177, 10, 183, 213, 75, 254, 211, 201, 100, 7, 58, 14, 225, 114, 243, 218, 166, 35, 37, 175, 2, 26, 104, 247, 7, 81, 26]);
  const seedOne = '12345678901234567890123456789012';
  const seedTwo = '0x9d61b19deffd5a60ba844af492ec2cc44449c5697b326919703bac031cae7f60';
  let keypair;

  beforeEach(() => {
    keypair = index();

    keypair.addFromSeed(seedOne);
  });

  it('adds the pair', () => {
    expect(
      keypair.addFromSeed(seedTwo)
    ).toMatchObject({
      publicKey: publicKeyTwo
    });
  });

  it('allows publicKeys retrieval', () => {
    keypair.addFromSeed(seedTwo);

    expect(
      keypair.getPublicKeys()
    ).toEqual([ publicKeyOne, publicKeyTwo ]);
  });

  it('allows retrieval of a specific item', () => {
    expect(
      keypair.getPair(publicKeyOne)
    ).toMatchObject({
      publicKey: publicKeyOne
    });
  });
});
