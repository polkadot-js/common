// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import BN from 'bn.js';
import hash from 'hash.js';

import { bnToU8a, u8aConcat } from '@polkadot/util';

// performs hard-only derivation on the xprv
export function ledgerDerivePrivate (xprv: Uint8Array, index: number): Uint8Array {
  const kl = xprv.slice(0, 32);
  const kr = xprv.slice(32, 64);
  const cc = xprv.slice(64, 96);

  const data = new Uint8Array(1 + 64 + 4);

  data.set(bnToU8a(index, { bitLength: 32, isLe: true }), 1 + 64);
  data.set(kl, 1);
  data.set(kr, 1 + 32);
  data[0] = 0x00;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const z = hash.hmac(hash.sha512, cc).update(data).digest();

  data[0] = 0x01;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const i = hash.hmac(hash.sha512, cc).update(data).digest();
  const chainCode = i.slice(32, 64);
  const zl = z.slice(0, 32);
  const zr = z.slice(32, 64);
  const left = bnToU8a(new BN(kl, 16, 'le').add(new BN(zl.slice(0, 28), 16, 'le').mul(new BN(8))), { bitLength: 512, isLe: true }).slice(0, 32);
  const right = bnToU8a(new BN(kr, 16, 'le').add(new BN(zr, 16, 'le')), { bitLength: 512, isLe: true }).slice(0, 32);

  return u8aConcat(left, right, chainCode);
}
