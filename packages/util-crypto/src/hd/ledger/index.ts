// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Keypair } from '../../types';

import { assert } from '@polkadot/util';

import { ed25519PairFromSeed } from '../../ed25519';
import { mnemonicValidate } from '../../mnemonic';
import { HARDENED, hdValidatePath } from '../validatePath';
import { ledgerDerivePrivate } from './derivePrivate';
import { ledgerMaster } from './master';

export function hdLedger (_mnemonic: string, path: string): Keypair {
  const words = _mnemonic
    .split(' ')
    .map((s) => s.trim())
    .filter((s) => s);

  assert([12, 24, 25].includes(words.length), 'Expected a mnemonic with 24 words (or 25 including a password)');

  const [mnemonic, password] = words.length === 25
    ? [words.slice(0, 24).join(' '), words[24]]
    : [words.join(' '), ''];

  assert(mnemonicValidate(mnemonic), 'Invalid mnemonic passed to ledger derivation');
  assert(hdValidatePath(path), 'Invalid derivation path');

  const parts = path.split('/').slice(1);
  let seed = ledgerMaster(mnemonic, password);

  for (const p of parts) {
    const n = parseInt(p.replace(/'$/, ''), 10);

    seed = ledgerDerivePrivate(seed, (n < HARDENED) ? (n + HARDENED) : n);
  }

  return ed25519PairFromSeed(seed.slice(0, 32));
}
