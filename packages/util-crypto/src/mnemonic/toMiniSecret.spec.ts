// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { u8aEq, u8aToHex } from '@polkadot/util';

import tests from '../schnorrkel/keypair/testing';
import { cryptoWaitReady } from '..';
import { mnemonicToMiniSecret } from './toMiniSecret';

const MNEMONIC = 'seed sock milk update focus rotate barely fade car face mechanic mercy';
const SEED = '0x4d1ab2a57929edfd018aaa974e62ed557e3f54b4104acabedf73c8f5a1dbb029';

describe('mnemonicToMiniSecret', (): void => {
  beforeEach(async (): Promise<void> => {
    await cryptoWaitReady();
  });

  [undefined, 'foo', 'bar'].forEach((password): void => {
    it(`generates Wasm & Js equivalents (password = ${password || 'undefined'})`, (): void => {
      expect(
        u8aEq(
          mnemonicToMiniSecret(MNEMONIC, password, true),
          mnemonicToMiniSecret(MNEMONIC, password, false)
        )
      ).toEqual(true);
    });
  });

  [false, true].forEach((onlyJs): void => {
    it(`generates a valid seed (onlyJs = ${onlyJs.toString()})`, (): void => {
      expect(
        u8aToHex(mnemonicToMiniSecret(MNEMONIC, undefined, onlyJs))
      ).toEqual(SEED);
    });
  });

  tests.forEach(([mnemonic, , seed], index): void => {
    [false, true].forEach((onlyJs): void => {
      it(`Created correct seed for ${index} (onlyJs = ${onlyJs.toString()})`, (): void => {
        expect(
          u8aToHex(mnemonicToMiniSecret(mnemonic, 'Substrate', onlyJs))
        ).toEqual(
          // mini returned here, only check first 32-bytes (64 hex + 2 prefix)
          seed.substr(0, 66)
        );
      });
    });
  });
});
