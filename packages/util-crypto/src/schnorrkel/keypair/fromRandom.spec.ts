// Copyright 2017-2019 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { schnorrkelKeypairFromRandom } from '../index';

describe('schnorrkelKeypairFromRandom', () => {
  it('generates a valid publicKey', () => {
    expect(
      schnorrkelKeypairFromRandom().publicKey
    ).toHaveLength(32);
  });

  it('generates a valid secretKey', () => {
    expect(
      schnorrkelKeypairFromRandom().secretKey
    ).toHaveLength(64);
  });
});
