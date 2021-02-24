// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { u8aEq, u8aToHex } from '@polkadot/util';
import { waitReady } from '@polkadot/wasm-crypto';

import { mnemonicToLegacySeed } from './';

const MNEMONIC = 'seed sock milk update focus rotate barely fade car face mechanic mercy';
const SEED_32 = '0x3c121e20de068083b49c2315697fb59a2d9e8643c24e5ea7628132c58969a027';
const SEED_64 = '0x3c121e20de068083b49c2315697fb59a2d9e8643c24e5ea7628132c58969a0275693dd5bd9d4cc9e648475eba9613ed4678f4d62560a9c42f75bac04022ded25';

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
    it(`generates a valid 64bytes seed (onlyJs = ${onlyJs.toString()})`, (): void => {
      expect(
        u8aToHex(mnemonicToLegacySeed(MNEMONIC, undefined, onlyJs, 64))
      ).toEqual(SEED_64);
    });
  });

  [false, true].forEach((onlyJs): void => {
    it(`generates a valid 32bytes seed (onlyJs = ${onlyJs.toString()})`, (): void => {
      expect(
        u8aToHex(mnemonicToLegacySeed(MNEMONIC, undefined, onlyJs))
      ).toEqual(SEED_32);
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
