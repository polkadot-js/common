// Copyright 2017-2018 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { naclKeypairFromRandom } from '../index';

describe('naclKeypairFromRandom', () => {
  let keypair;

  beforeEach(() => {
    keypair = naclKeypairFromRandom();
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
