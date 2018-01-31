// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const { naclKeypair } = require('./index');

describe('naclKeypair', () => {
  let keypair;

  beforeEach(() => {
    keypair = naclKeypair();
  });

  it('generates a valid publicKey', () => {
    expect(
      keypair.publicKey
    ).toHaveLength(32);
  });

  it('generates a valid secretKey', () => {
    expect(
      keypair.secretKey
    ).toHaveLength(64);
  });
});
