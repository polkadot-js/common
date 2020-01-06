// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { stringToU8a } from '@polkadot/util';
import { waitReady } from '@polkadot/wasm-crypto';

import randomAsU8a from '../random/asU8a';
import pairFromSeed from './keypair/fromSeed';
import sign from './sign';
import verify from './verify';

const MESSAGE = stringToU8a('this is a message');

describe('sign and verify', (): void => {
  beforeEach(async (): Promise<void> => {
    await waitReady();
  });

  it('has 64-byte signatures', (): void => {
    const pair = pairFromSeed(randomAsU8a());

    expect(sign(MESSAGE, pair)).toHaveLength(64);
  });

  it('can sign and verify a message', (): void => {
    const pair = pairFromSeed(randomAsU8a());
    const signature = sign(MESSAGE, pair);

    expect(verify(MESSAGE, signature, pair.publicKey)).toBe(true);
  });
});
