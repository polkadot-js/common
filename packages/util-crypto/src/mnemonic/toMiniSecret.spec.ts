// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { u8aToHex } from '@polkadot/util';

import mnemonicToMiniSecret from './toMiniSecret';
import tests from '../schnorrkel/keypair/testing';
import { cryptoWaitReady } from '..';

describe('mnemonicToMiniSecret', (): void => {
  beforeEach(async (): Promise<void> => {
    await cryptoWaitReady();
  });

  it('generates a valid seed', (): void => {
    expect(
      u8aToHex(mnemonicToMiniSecret('seed sock milk update focus rotate barely fade car face mechanic mercy'))
    ).toEqual('0x4d1ab2a57929edfd018aaa974e62ed557e3f54b4104acabedf73c8f5a1dbb029');
  });

  tests.forEach(([mnemonic, , seed], index): void => {
    it(`Created correct seed for ${index}`, (): void => {
      expect(
        u8aToHex(mnemonicToMiniSecret(mnemonic, 'Substrate'))
      ).toEqual(
        // mini returned here, only check first 32-bytes (64 hex + 2 prefix)
        seed.substr(0, 66)
      );
    });
  });
});
