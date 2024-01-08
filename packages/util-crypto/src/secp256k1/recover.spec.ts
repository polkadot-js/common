// Copyright 2017-2024 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { u8aToHex, u8aToU8a } from '@polkadot/util';
import { waitReady } from '@polkadot/wasm-crypto';

import { keccakAsU8a } from '../keccak/index.js';
import { perfWasm } from '../test/index.js';
import { secp256k1Recover } from './index.js';

const sig = u8aToU8a('0x7505f2880114da51b3f5d535f8687953c0ab9af4ab81e592eaebebf53b728d2b6dfd9b5bcd70fee412b1f31360e7c2774009305cb84fc50c1d0ff8034dfa5fff');
const msg = u8aToU8a('0xa30b64ce1eedf409c8afb801d72c05234e64849ea538c15dd3c8cf4ffcf166c9');

describe('secp256k1Recover', (): void => {
  beforeEach(async (): Promise<void> => {
    await waitReady();
  });

  for (const onlyJs of [false, true]) {
    describe(`onlyJs=${(onlyJs && 'true') || 'false'}`, (): void => {
      it('recovers a publicKey', (): void => {
        const pubKey = '0x93a9fc7154c6da3c826415df01eb0e37fb4da4b0';
        const res = keccakAsU8a(secp256k1Recover(msg, sig, 0, undefined, onlyJs));

        expect(u8aToHex(res.subarray(-20))).toEqual(pubKey);
      });
    });
  }

  perfWasm('secp256k1Recover', 200, (_, onlyJs) =>
    secp256k1Recover(msg, sig, 0, undefined, onlyJs)
  );
});
