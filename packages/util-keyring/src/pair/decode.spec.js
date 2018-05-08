// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const keyring = require('../testingPairs')();

describe('decode', () => {
  it('fails when no data provided', () => {
    expect(
      () => keyring.alice.decodePkcs8()
    ).toThrow(/No encrypted data available/);
  });

  it('returns correct publicKey from encoded', () => {
    expect(
      () => keyring.alice.decodePkcs8(
        keyring.alice.encodePkcs8('testing'), 'testing'
      )
    ).not.toThrow();
  });
});
