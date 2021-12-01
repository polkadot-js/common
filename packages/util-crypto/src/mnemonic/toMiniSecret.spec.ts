// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { u8aEq, u8aToHex } from '@polkadot/util';

import tests from '../sr25519/pair/testing.spec';
import { cryptoWaitReady } from '..';
import { mnemonicToMiniSecret } from './toMiniSecret';

const MNEMONIC = 'seed sock milk update focus rotate barely fade car face mechanic mercy';
const SEED = '0x4d1ab2a57929edfd018aaa974e62ed557e3f54b4104acabedf73c8f5a1dbb029';

describe('mnemonicToMiniSecret', (): void => {
  beforeEach(async (): Promise<void> => {
    await cryptoWaitReady();
  });

  it.each([undefined, 'foo', 'bar'])('generates Wasm & Js equivalents for password = %p', (password): void => {
    expect(
      u8aEq(
        mnemonicToMiniSecret(MNEMONIC, password, true),
        mnemonicToMiniSecret(MNEMONIC, password, false)
      )
    ).toEqual(true);
  });

  describe.each([false, true])('onlyJs=%p', (onlyJs): void => {
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
          seed.substr(0, 66)
        );
      });
    });
  });
});
