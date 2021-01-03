// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { u8aToHex } from '@polkadot/util';
import { waitReady } from '@polkadot/wasm-crypto';

import { mnemonicToLegacySeed } from './';

const MENMONIC = 'seed sock milk update focus rotate barely fade car face mechanic mercy';
const SEED = '0x3c121e20de068083b49c2315697fb59a2d9e8643c24e5ea7628132c58969a027';

describe('mnemonicToLegacySeed', (): void => {
  beforeEach(async (): Promise<void> => {
    await waitReady();
  });

  [false, true].forEach((onlyJs): void => {
    it(`generates a valid seed (onlyJs = ${onlyJs.toString()})`, (): void => {
      expect(
        u8aToHex(mnemonicToLegacySeed(MENMONIC, undefined, onlyJs))
      ).toEqual(SEED);
    });
  });
});
