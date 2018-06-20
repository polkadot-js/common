// Copyright 2017-2018 @polkadot/util-keyring authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import testingPairs from '../testingPairs';

const keyring = testingPairs();

describe('decode', () => {
  it('fails when no data provided', () => {
    expect(
      () => keyring.alice.decodePkcs8()
    ).toThrow(/No encrypted data available/);
  });

  it('returns correct publicKey from encoded', () => {
    expect(
      () => keyring.alice.decodePkcs8(
        'testing', keyring.alice.encodePkcs8('testing')
      )
    ).not.toThrow();
  });
});
