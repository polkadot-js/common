// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { hexToU8a } from '@polkadot/util';
import { waitReady } from '@polkadot/wasm-crypto';

import { performanceWasm } from '../../test/performance';
import { secp256k1PairFromSeed, secp256k1Recover, secp256k1Sign } from '.';

const pair = secp256k1PairFromSeed(hexToU8a('0x4380de832af797688026ce24f85204d508243f201650c1a134929e5458b7fbae'));
const msg = hexToU8a('0xa30b64ce1eedf409c8afb801d72c05234e64849ea538c15dd3c8cf4ffcf166c9');

describe('sign', (): void => {
  beforeEach(async (): Promise<void> => {
    await waitReady();
  });

  describe.each([false, true])('onlyJs=%p', (onlyJs): void => {
    it('generates a known signature', (): void => {
      expect(
        secp256k1Sign(msg, pair, undefined, onlyJs)
      ).toEqual(hexToU8a(
        // as of libsecp256k1 0.7.0 the wasm yields different s & v values
        onlyJs
          ? '0xdf92f73d9f060cefacf187b5414491cb992998ace017fa48839b5cda3e264ba8c4efa521361678d9b8582744d77aa4b8d886d7380b7808a683174afad9c4700300'
          : '0xdf92f73d9f060cefacf187b5414491cb992998ace017fa48839b5cda3e264ba83b105adec9e9872647a7d8bb28855b45e22805aea3d097953cbb1391f671d13e01'
      ));
    });
  });

  // since the libsecp256k1 signatures don't match (but can be verified), we
  // do both signing and verification here (checking the extracted key)
  performanceWasm('secp256k1Sign/Verify', 100, (_, onlyJs) => {
    const sig = secp256k1Sign(msg, pair, undefined, onlyJs);

    return secp256k1Recover(msg, sig, sig[64], undefined, onlyJs);
  });
});
