// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { u8aEq, u8aToHex } from '@polkadot/util';
import { waitReady } from '@polkadot/wasm-crypto';

import { mnemonicToLegacySeed } from './';

const MNEMONIC = 'seed sock milk update focus rotate barely fade car face mechanic mercy';
const SEED = '0x3c121e20de068083b49c2315697fb59a2d9e8643c24e5ea7628132c58969a027';

describe('mnemonicToLegacySeed', (): void => {
  beforeEach(async (): Promise<void> => {
    await waitReady();
  });

  [undefined, 'foo', 'bar'].forEach((password): void => {
    it(`generates Wasm & Js equivalents (password = ${password || 'undefined'})`, (): void => {
      expect(
        u8aEq(
          mnemonicToLegacySeed(MNEMONIC, password, true),
          mnemonicToLegacySeed(MNEMONIC, password, false)
        )
      ).toEqual(true);
    });
  });

  [false, true].forEach((onlyJs): void => {
    it(`generates a valid seed (onlyJs = ${onlyJs.toString()})`, (): void => {
      expect(
        u8aToHex(mnemonicToLegacySeed(MNEMONIC, undefined, onlyJs))
      ).toEqual(SEED);
    });
  });

  [false, true].forEach((onlyJs): void => {
    it(`fails with non-mnemonics (onlyJs = ${onlyJs.toString()})`, (): void => {
      expect(
        () => mnemonicToLegacySeed('foo bar baz', undefined, onlyJs)
      ).toThrow(/mnemonic specified/);
    });
  });
});
