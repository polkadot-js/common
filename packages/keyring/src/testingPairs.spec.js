// Copyright 2017-2018 @polkadot/keyring authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

describe('testing', () => {
  it('creates without failing', () => {
    expect(
      require('./testingPairs')
    ).toBeDefined();
  });
});
