// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import hash from 'hash.js';

import { u8aConcat } from '@polkadot/util';

import { mnemonicToSeedSync } from '../../mnemonic/bip39';

const ED25519_CRYPTO = 'ed25519 seed';

// gets an xprv from a mnemonic
export function ledgerMaster (mnemonic: string): Uint8Array {
  const seed = mnemonicToSeedSync(mnemonic);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const chainCode = hash.hmac(hash.sha256, ED25519_CRYPTO).update(new Uint8Array([1, ...seed])).digest();
  let priv;

  while (!priv || (priv[31] & 0b0010_0000)) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    priv = hash.hmac(hash.sha512, ED25519_CRYPTO).update(priv || seed).digest();
  }

  priv[0] &= 0b1111_1000;
  priv[31] &= 0b0111_1111;
  priv[31] |= 0b0100_0000;

  return u8aConcat(priv, chainCode);
}
