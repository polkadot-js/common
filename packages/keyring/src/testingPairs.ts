// Copyright 2017-2020 @polkadot/keyring authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

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
