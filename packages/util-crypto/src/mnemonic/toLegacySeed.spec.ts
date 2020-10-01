// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { u8aToHex } from '@polkadot/util';
import { waitReady } from '@polkadot/wasm-crypto';

import { mnemonicToLegacySeed } from './';

describe('mnemonicToLegacySeed', (): void => {
  it('generates a valid seed', (): void => {
    expect(
      u8aToHex(
        mnemonicToLegacySeed('seed sock milk update focus rotate barely fade car face mechanic mercy')
      )
    ).toEqual('0x3c121e20de068083b49c2315697fb59a2d9e8643c24e5ea7628132c58969a027');
  });

  it('generates the seed via WASM', async (): Promise<void> => {
    await waitReady();

    expect(
      u8aToHex(
        mnemonicToLegacySeed('seed sock milk update focus rotate barely fade car face mechanic mercy')
      )
    ).toEqual('0x3c121e20de068083b49c2315697fb59a2d9e8643c24e5ea7628132c58969a027');
  });
});
