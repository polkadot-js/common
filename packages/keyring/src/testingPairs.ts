// Copyright 2017-2023 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { KeyringOptions, KeyringPair } from './types.js';

import { nobody } from './pair/nobody.js';
import { createTestKeyring } from './testing.js';

export interface TestKeyringMap {
  [index: string]: KeyringPair;
}

export function createTestPairs (options?: KeyringOptions, isDerived = true): TestKeyringMap {
  const keyring = createTestKeyring(options, isDerived);
  const pairs = keyring.getPairs();
  const map: TestKeyringMap = { nobody: nobody() };

  for (const p of pairs) {
    map[p.meta.name as string] = p;
  }

  return map;
}
