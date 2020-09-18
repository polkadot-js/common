// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

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

  it('throws error when publicKey lengths do not match', (): void => {
    expect(
      () => verify(
        new Uint8Array([0x61, 0x62, 0x63, 0x64]),
        new Uint8Array(64),
        new Uint8Array(31)
      )
    ).toThrow(/Invalid publicKey/);
  });

  it('throws error when signature lengths do not match', (): void => {
    expect(
      () => verify(
        new Uint8Array([0x61, 0x62, 0x63, 0x64]),
        new Uint8Array(65),
        new Uint8Array(32)
      )
    ).toThrow(/Invalid signature/);
  });
});
