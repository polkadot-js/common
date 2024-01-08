// Copyright 2017-2024 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import '../bundleInit.js';

import { hexToU8a } from '@polkadot/util';
import { waitReady } from '@polkadot/wasm-crypto';

import { perfWasm } from '../test/index.js';
import { hasher } from './hasher.js';
import { secp256k1PairFromSeed, secp256k1Verify } from './index.js';

const message = 'Pay KSMs to the Kusama account:88dc3417d5058ec4b4503e0c12ea1a0a89be200fe98922423d4334014fa6b0ee';

describe('secp256k1Verify', (): void => {
  beforeEach(async (): Promise<void> => {
    await waitReady();
  });

  for (const onlyJs of [false, true]) {
    describe(`onlyJs=${(onlyJs && 'true') || 'false'}`, (): void => {
      it('validates known ETH against address', (): void => {
        expect(
          secp256k1Verify(
            `\x19Ethereum Signed Message:\n${message.length.toString()}${message}`,
            '0x55bd020bdbbdc02de34e915effc9b18a99002f4c29f64e22e8dcbb69e722ea6c28e1bb53b9484063fbbfd205e49dcc1f620929f520c9c4c3695150f05a28f52a01',
            '0x002309df96687e44280bb72c3818358faeeb699c',
            'keccak',
            onlyJs
          )
        ).toEqual(true);
      });

      for (const isPublic of [false, true]) {
        describe(`validation against known, isPublic=${(isPublic && 'true') || 'false'}`, (): void => {
          const pair = secp256k1PairFromSeed(hexToU8a('0x4380de832af797688026ce24f85204d508243f201650c1a134929e5458b7fbae'));
          const msg = hexToU8a('0xa30b64ce1eedf409c8afb801d72c05234e64849ea538c15dd3c8cf4ffcf166c9');
          const addr = isPublic
            ? pair.publicKey
            : hasher('blake2', pair.publicKey, onlyJs);

          it('signature from JS', (): void => {
            expect(
              secp256k1Verify(
                msg,
                '0xdf92f73d9f060cefacf187b5414491cb992998ace017fa48839b5cda3e264ba8c4efa521361678d9b8582744d77aa4b8d886d7380b7808a683174afad9c4700300',
                addr,
                'blake2',
                onlyJs
              )
            ).toEqual(true);
          });

          it('signature from wasm', (): void => {
            expect(
              secp256k1Verify(
                msg,
                '0xdf92f73d9f060cefacf187b5414491cb992998ace017fa48839b5cda3e264ba83b105adec9e9872647a7d8bb28855b45e22805aea3d097953cbb1391f671d13e01',
                addr,
                'blake2',
                onlyJs
              )
            ).toEqual(true);
          });
        });
      }
    });
  }

  perfWasm('secp256k1Verify', 100, (_, onlyJs) =>
    secp256k1Verify(
      `\x19Ethereum Signed Message:\n${message.length.toString()}${message}`,
      '0x55bd020bdbbdc02de34e915effc9b18a99002f4c29f64e22e8dcbb69e722ea6c28e1bb53b9484063fbbfd205e49dcc1f620929f520c9c4c3695150f05a28f52a01',
      '0x002309df96687e44280bb72c3818358faeeb699c',
      'keccak',
      onlyJs
    )
  );
});
