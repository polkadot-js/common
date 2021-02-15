// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { BN_EIGHT, bnToU8a, u8aConcat, u8aToBn } from '@polkadot/util';

import { hmacSha512 } from '../../hmac';

// performs hard-only derivation on the xprv
export function ledgerDerivePrivate (xprv: Uint8Array, index: number): Uint8Array {
  const kl = xprv.subarray(0, 32);
  const kr = xprv.subarray(32, 64);
  const cc = xprv.subarray(64, 96);
  const data = u8aConcat([0], kl, kr, bnToU8a(index, { bitLength: 32, isLe: true }));
  const z = hmacSha512(cc, data);

  data[0] = 0x01;

  return u8aConcat(
    bnToU8a(
      u8aToBn(kl, { isLe: true }).iadd(u8aToBn(z.subarray(0, 28), { isLe: true }).imul(BN_EIGHT)),
      { bitLength: 512, isLe: true }
    ).subarray(0, 32),
    bnToU8a(
      u8aToBn(kr, { isLe: true }).iadd(u8aToBn(z.subarray(32, 64), { isLe: true })),
      { bitLength: 512, isLe: true }
    ).subarray(0, 32),
    hmacSha512(cc, data).subarray(32, 64)
  );
}
