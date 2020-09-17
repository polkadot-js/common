// Copyright 2017-2020 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { cryptoWaitReady } from '@polkadot/util-crypto';

import testingPairs from './testingPairs';

describe('testingPairs', (): void => {
  beforeEach(async (): Promise<void> => {
    await cryptoWaitReady();
  });

  it('creates without failing', (): void => {
    expect(
      Object.keys(testingPairs())
    ).toHaveLength(2 + 0 + 7); // stash, session, pairs
  });

  it('has the correct address for Alice (non-HDKD)', (): void => {
    expect(
      testingPairs({ type: 'ed25519' }, false).alice.address
    ).toEqual('5GoKvZWG5ZPYL1WUovuHW3zJBWBP5eT8CbqjdRY4Q6iMaQua');
  });

  it('has the correct address for Alice (HDKD)', (): void => {
    expect(
      testingPairs({ type: 'ed25519' }).alice.address
    ).toEqual('5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY');
  });
});
