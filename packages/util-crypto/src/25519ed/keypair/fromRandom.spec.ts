// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Keypair } from '../../types';

import { ed25519KeypairFromRandom } from '..';

describe('ed25519KeypairFromRandom', (): void => {
  let keypair: Keypair;

  beforeEach((): void => {
    keypair = ed25519KeypairFromRandom();
  });

  it('generates a valid publicKey', (): void => {
    expect(
      keypair.publicKey
    ).toHaveLength(32);
  });

  it('generates a valid secretKey', (): void => {
    expect(
      keypair.secretKey
    ).toHaveLength(64);
  });
});
