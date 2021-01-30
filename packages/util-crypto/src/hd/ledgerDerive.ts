// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Keypair } from '../types';

import { assert } from '@polkadot/util';

import { mnemonicValidate } from '../mnemonic';
import { naclKeypairFromSeed } from '../nacl';
import { ledgerDerivePrivate } from './ledger/derivePrivate';
import { ledgerMaster } from './ledger/master';
import { ledgerValidatePath } from './ledger/validatePath';

const HARDENED = 0x80000000;

export function hdLedgerDerive (mnemonic: string, path: string): Keypair {
  assert(mnemonicValidate(mnemonic), 'Invalid mnemonic passed to ledger derivation');
  assert(ledgerValidatePath(path), 'Invalid derivation path');

  return naclKeypairFromSeed(
    path
      .split('/')
      .slice(1)
      .map((n) => parseInt(n.replace("'", ''), 10))
      .map((n) => (n < HARDENED) ? (n + HARDENED) : n)
      .reduce((x, n) => ledgerDerivePrivate(x, n), ledgerMaster(mnemonic))
      .slice(0, 32)
  );
}
