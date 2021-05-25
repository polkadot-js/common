// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { u8aConcat } from '@polkadot/util';

import { hmacSha256, hmacSha512 } from '../../hmac';
import { mnemonicToSeedSync } from '../../mnemonic/bip39';

const ED25519_CRYPTO = 'ed25519 seed';

// gets an xprv from a mnemonic
export function ledgerMaster (mnemonic: string, password?: string): Uint8Array {
  const seed = mnemonicToSeedSync(mnemonic, password);
  const chainCode = hmacSha256(ED25519_CRYPTO, new Uint8Array([1, ...seed]));
  let priv;

  while (!priv || (priv[31] & 0b0010_0000)) {
    priv = hmacSha512(ED25519_CRYPTO, priv || seed);
  }

  priv[0] &= 0b1111_1000;
  priv[31] &= 0b0111_1111;
  priv[31] |= 0b0100_0000;

  return u8aConcat(priv, chainCode);
}
