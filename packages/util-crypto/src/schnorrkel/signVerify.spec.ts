// Copyright 2017-2019 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { stringToU8a } from '@polkadot/util/index';

import pairFromRandom from './keypair/fromRandom';
import sign from './sign';
import verify from './verify';

const MESSAGE = stringToU8a('this is a message');

describe('sign and verify', () => {
  it('has 64-byte signatures', () => {
    const pair = pairFromRandom();

    expect(sign(MESSAGE, pair)).toHaveLength(64);
  });

  it('can sign and verify a message', () => {
    const pair = pairFromRandom();
    const signature = sign(MESSAGE, pair);

    expect(verify(MESSAGE, signature, pair.publicKey)).toBe(true);
  });
});
