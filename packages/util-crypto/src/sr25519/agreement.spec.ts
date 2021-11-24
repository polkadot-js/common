// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Keypair } from '../types';

import { u8aToHex } from '@polkadot/util';
import { waitReady } from '@polkadot/wasm-crypto';

import { sr25519Agreement, sr25519PairFromSeed } from '.';

describe('agreement', (): void => {
  let pairA: Keypair;
  let pairB: Keypair;

  beforeEach(async (): Promise<void> => {
    await waitReady();

    pairA = sr25519PairFromSeed('0x98b3d305d5a5eace562387e47e59badd4d77e3f72cabfb10a60f8a197059f0a8');
    pairB = sr25519PairFromSeed('0x9732eea001851ff862d949a1699c9971f3a26edbede2ad7922cbbe9a0701f366');
  });

  it('matches a known agreement (both ways)', (): void => {
    const TEST = '0xb03a0b198c34c16f35cae933d88b16341b4cef3e84e851f20e664c6a30527f4e';

    expect(
      u8aToHex(sr25519Agreement(pairA.secretKey, pairB.publicKey))
    ).toEqual(TEST);
    expect(
      u8aToHex(sr25519Agreement(pairB.secretKey, pairA.publicKey))
    ).toEqual(TEST);
  });
});
