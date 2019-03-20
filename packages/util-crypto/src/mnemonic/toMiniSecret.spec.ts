// Copyright 2017-2019 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { u8aToHex } from '@polkadot/util';

import mnemonicToMiniSecret from './toMiniSecret';
import tests from '../schnorrkel/keypair/testing';
import { cryptoWaitReady } from '..';

describe('mnemonicToMiniSecret', () => {
  beforeEach(async () => {
    await cryptoWaitReady();
  });

  tests.forEach(([mnemonic, , seed], index) => {
    it(`Created correct seed for ${index}`, () => {
      expect(
        u8aToHex(mnemonicToMiniSecret(mnemonic, 'Substrate'))
      ).toEqual(
        // mini returned here, only check first 32-bytes (64 hex + 2 prefix)
        seed.substr(0, 66)
      );
    });
  });
});
