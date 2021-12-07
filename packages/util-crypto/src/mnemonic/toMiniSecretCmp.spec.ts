// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { arrayRange, u8aEq } from '@polkadot/util';

import { cryptoWaitReady, ed25519PairFromSeed, mnemonicGenerate, mnemonicToMiniSecret, sr25519PairFromSeed } from '..';

// NOTE: This basically controls how long stuff runs for, YMMV
//
// - 100 runs with 5 checks, takes 2mins on _my_ machine
// - 10_000 runs with 5 checks should be ~3hrs
const NUM_RUNS = 100;
const NUM_CHECKS = 5;

// generate either a JS or WASM mnemonic
describe.each([true, false])('mnemonicToMiniSecret (compare), onlyJsMnemonic=%p', (onlyJsMnemonic): void => {
  beforeAll(async (): Promise<void> => {
    await cryptoWaitReady();
  });

  // loop through lots of mnemonics
  describe.each(arrayRange(NUM_RUNS))('run=%p', (): void => {
    // compare both JS and WASM outputs against original
    describe.each([true, false])('onlyJsMini=%p', (onlyJsMini): void => {
      // NOTE we cannot actually use the onlyJsMnemonic flag here
      const mnemonic = mnemonicGenerate(12);

      describe(mnemonic, (): void => {
        // do iterations to check and re-check that all matches
        it.concurrent.each(arrayRange(NUM_CHECKS))('check=%p', (count): void => {
          const minisecret = mnemonicToMiniSecret(mnemonic, count ? `${count}` : '', onlyJsMnemonic);
          const edpub = ed25519PairFromSeed(minisecret).publicKey;
          const srpub = sr25519PairFromSeed(minisecret).publicKey;

          const testmini = mnemonicToMiniSecret(mnemonic, count ? `${count}` : '', onlyJsMini);

          // explicit minisecret compare
          expect(
            u8aEq(minisecret, testmini)
          ).toEqual(true);

          // compare the sr25519 keypair generated
          expect(
            u8aEq(srpub, sr25519PairFromSeed(testmini).publicKey)
          ).toEqual(true);

          // compare ed both in WASM and JS
          [true, false].forEach((onlyJsEd): void => {
            expect(
              u8aEq(edpub, ed25519PairFromSeed(testmini, onlyJsEd).publicKey)
            ).toEqual(true);
          });
        });
      });
    });
  });
});
