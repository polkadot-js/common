// Copyright 2017-2020 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { KeyringPair, KeyringOptions } from './types';

import createKeyring from './testing';
import nobody from './pair/nobody';

export interface TestKeyringMap {
  [index: string]: KeyringPair;
}

export default function testKeyringPairs (options?: KeyringOptions, isDerived = true): TestKeyringMap {
  const keyring = createKeyring(options, isDerived);
  const pairs = keyring.getPairs();
  const map: TestKeyringMap = { nobody: nobody() };

  return pairs.reduce((result, pair): TestKeyringMap => {
    const { name } = pair.meta;

    result[name as string] = pair;

    return result;
  }, map);
}
