// Copyright 2017-2019 @polkadot/keyring authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { cryptoWaitReady } from '@polkadot/util-crypto/index';
import testingPairs from './testingPairs';

describe('testing', () => {
  beforeEach(async () => {
    await cryptoWaitReady();
  });

  it('creates without failing', () => {
    expect(
      Object.keys(testingPairs())
    ).toHaveLength(1 + 6);
  });

  it('has the correct address for Alice (non-HDKD)', () => {
    expect(
      testingPairs({ type: 'ed25519' }, false).alice.address()
    ).toEqual('5GoKvZWG5ZPYL1WUovuHW3zJBWBP5eT8CbqjdRY4Q6iMaDtZ');
  });

  it('has the correct address for Alice (HDKD)', () => {
    expect(
      testingPairs({ type: 'ed25519' }, true).alice.address()
    ).toEqual('5CfbEZ9EvFsdZ2yHPt5BsSsGpM9mZPkahsZm6WeZE87mJKKT');
  });
});
