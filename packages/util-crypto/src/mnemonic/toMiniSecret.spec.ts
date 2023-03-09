// Copyright 2017-2023 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev/node/test/node" />

import { u8aEq, u8aToHex } from '@polkadot/util';

import { cryptoWaitReady } from '../index.js';
import tests from '../sr25519/pair/testing.spec.js';
import { mnemonicToMiniSecret } from './toMiniSecret.js';

const MNEMONIC = 'seed sock milk update focus rotate barely fade car face mechanic mercy';
const SEED = '0x4d1ab2a57929edfd018aaa974e62ed557e3f54b4104acabedf73c8f5a1dbb029';

await cryptoWaitReady();

describe('mnemonicToMiniSecret', (): void => {
  for (const password of [undefined, 'foo', 'bar']) {
    it(`generates Wasm & Js equivalents for password=${password || 'undefined'}`, (): void => {
      expect(
        u8aEq(
          mnemonicToMiniSecret(MNEMONIC, password, true),
          mnemonicToMiniSecret(MNEMONIC, password, false)
        )
      ).toEqual(true);
    });
  }

  for (const onlyJs of [false, true]) {
    describe(`onlyJs=${(onlyJs && 'true') || 'false'}`, (): void => {
      it('generates a valid seed', (): void => {
        expect(
          u8aToHex(mnemonicToMiniSecret(MNEMONIC, undefined, onlyJs))
        ).toEqual(SEED);
      });

      it('fails with non-mnemonics', (): void => {
        expect(
          () => mnemonicToMiniSecret('foo bar baz', undefined, onlyJs)
        ).toThrow(/mnemonic specified/);
      });

      tests.forEach(([mnemonic, , seed], index): void => {
        it(`Created correct seed for ${index}`, (): void => {
          expect(
            u8aToHex(mnemonicToMiniSecret(mnemonic, 'Substrate', onlyJs))
          ).toEqual(
            // mini returned here, only check first 32-bytes (64 hex + 2 prefix)
            seed.substring(0, 66)
          );
        });
      });
    });
  }
});
