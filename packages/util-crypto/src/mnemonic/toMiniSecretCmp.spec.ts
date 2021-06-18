// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { arrayRange, u8aEq } from '@polkadot/util';

import { cryptoWaitReady, mnemonicGenerate, mnemonicToMiniSecret, naclKeypairFromSeed, schnorrkelKeypairFromSeed } from '..';

describe.skip('mnemonicToMiniSecret (compare)', (): void => {
  [true, false].forEach((onlyJsMnemonic): void => {
    // generate either a JS or WASM mnemonic
    describe(`onlyJs=${onlyJsMnemonic.toString()}`, (): void => {
      // loop through lots of mnemonics
      arrayRange(10_000).forEach((i): void => {
        describe(`${i.toString().padStart(7, ' ')}`, (): void => {
          let mnemonic: string;
          let minisecret: Uint8Array;
          let edpub: Uint8Array;
          let srpub: Uint8Array;

          beforeAll(async (): Promise<void> => {
            await cryptoWaitReady();

            mnemonic = mnemonicGenerate(12, onlyJsMnemonic);
            minisecret = mnemonicToMiniSecret(mnemonic, '', onlyJsMnemonic);
            edpub = naclKeypairFromSeed(minisecret).publicKey;
            srpub = schnorrkelKeypairFromSeed(minisecret).publicKey;
          });

          // do iterations to check and re-check that all matches
          arrayRange(20).forEach((i): void => {
            it(`${i.toString().padStart(3, ' ')}: ${mnemonic}`, (): void => {
              // compare both JS and WASM outputs against original
              [true, false].forEach((onlyJsMini): void => {
                const testmini = mnemonicToMiniSecret(mnemonic, '', onlyJsMini);

                // explicit minisecret compare
                expect(
                  u8aEq(minisecret, testmini)
                ).toEqual(true);

                // compare the sr25519 keypair generated
                expect(
                  u8aEq(srpub, schnorrkelKeypairFromSeed(testmini).publicKey)
                ).toEqual(true);

                // compare ed both in WASM and JS
                [true, false].forEach((onlyJsEd): void => {
                  expect(
                    u8aEq(edpub, naclKeypairFromSeed(testmini, onlyJsEd).publicKey)
                  ).toEqual(true);
                });
              });
            });
          });
        });
      });
    });
  });
});
