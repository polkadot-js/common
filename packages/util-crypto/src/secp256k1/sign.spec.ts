// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { hexToU8a } from '@polkadot/util';

import { secp256k1PairFromSeed, secp256k1Sign } from '.';

describe('sign', (): void => {
  it('generates a known signature', (): void => {
    const msg = hexToU8a('0xa30b64ce1eedf409c8afb801d72c05234e64849ea538c15dd3c8cf4ffcf166c9');
    const pair = secp256k1PairFromSeed(hexToU8a('0x4380de832af797688026ce24f85204d508243f201650c1a134929e5458b7fbae'));

    expect(
      secp256k1Sign(msg, pair)
    ).toBe(hexToU8a(
      '0xdf92f73d9f060cefacf187b5414491cb992998ace017fa48839b5cda3e264ba8c4efa521361678d9b8582744d77aa4b8d886d7380b7808a683174afad9c4700300'
    ));
  });
});