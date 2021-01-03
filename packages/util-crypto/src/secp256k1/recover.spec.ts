// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { u8aToHex, u8aToU8a } from '@polkadot/util';

import { keccakAsU8a } from '../keccak';
import { secp256k1Recover } from '.';

describe('secp256k1Recover', (): void => {
  it('recovers a publicKey', (): void => {
    const pubKey = '0x93a9fc7154c6da3c826415df01eb0e37fb4da4b0';
    const sig = '0x7505f2880114da51b3f5d535f8687953c0ab9af4ab81e592eaebebf53b728d2b6dfd9b5bcd70fee412b1f31360e7c2774009305cb84fc50c1d0ff8034dfa5fff';
    const msg = '0xa30b64ce1eedf409c8afb801d72c05234e64849ea538c15dd3c8cf4ffcf166c9';
    const res = keccakAsU8a(secp256k1Recover(u8aToU8a(msg), u8aToU8a(sig), 0));

    expect(u8aToHex(res.subarray(12))).toEqual(pubKey);
  });
});
