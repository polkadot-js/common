// Copyright 2017-2024 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { u8aEq, u8aToHex } from '@polkadot/util';

import { cryptoWaitReady } from '../index.js';
import tests from '../sr25519/pair/testing.spec.js';
import { korean as koreanWords } from './wordlists/index.js';
import { mnemonicToMiniSecret } from './toMiniSecret.js';

const MNEMONIC = 'seed sock milk update focus rotate barely fade car face mechanic mercy';
const SEED = '0x4d1ab2a57929edfd018aaa974e62ed557e3f54b4104acabedf73c8f5a1dbb029';

await cryptoWaitReady();

describe('mnemonicToMiniSecret', (): void => {
  for (const password of [undefined, 'foo', 'bar']) {
    it(`generates Wasm & Js equivalents for password=${password || 'undefined'}`, (): void => {
      expect(
        u8aEq(
          mnemonicToMiniSecret(MNEMONIC, password, undefined, true),
          mnemonicToMiniSecret(MNEMONIC, password, undefined, false)
        )
      ).toEqual(true);
    });
  }

  it('creates a known minisecret from a non-english mnemonic', (): void => {
    const mnemonic = '엉덩이 능동적 숫자 팩시밀리 비난 서적 파출소 도움 독창적 인생 상류 먼지 답변 음반 수박 사업 노란색 공사 우체국 특급 도대체 금지 굉장히 고무신';

    expect(
      () => mnemonicToMiniSecret(mnemonic, 'testing')
    ).toThrow();
    expect(
      u8aToHex(mnemonicToMiniSecret(mnemonic, 'testing', koreanWords))
    ).toEqual('0xefa278a62535581767a2f49cb542ed91b65fb911e1b05e7a09c702b257f10c13');
  });

  for (const onlyJs of [false, true]) {
    describe(`onlyJs=${(onlyJs && 'true') || 'false'}`, (): void => {
      it('generates a valid seed', (): void => {
        expect(
          u8aToHex(mnemonicToMiniSecret(MNEMONIC, undefined, undefined, onlyJs))
        ).toEqual(SEED);
      });

      it('fails with non-mnemonics', (): void => {
        expect(
          () => mnemonicToMiniSecret('foo bar baz', undefined, undefined, onlyJs)
        ).toThrow(/mnemonic specified/);
      });

      tests.forEach(([mnemonic, , seed], index): void => {
        it(`Created correct seed for ${index}`, (): void => {
          expect(
            u8aToHex(mnemonicToMiniSecret(mnemonic, 'Substrate', undefined, onlyJs))
          ).toEqual(
            // mini returned here, only check first 32-bytes (64 hex + 2 prefix)
            seed.substring(0, 66)
          );
        });
      });
    });
  }
});
