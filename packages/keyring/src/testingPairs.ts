// Copyright 2017-2018 @polkadot/keyring authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { KeyringPair, KeyringInstance } from './types';

import createKeyring from './testing';
import nobody from './pair/nobody';

type TestKeyringMap = {
  [index: string]: KeyringPair
};

export default function testKeyringPairs (): TestKeyringMap {
  const keyring = createKeyring();
  const pairs = keyring.getPairs();

  return pairs.reduce((result, pair) => {
    const { name } = pair.getMeta();

    // @ts-ignore dunno what the complaint here is about...
    result[name as string] = pair;

    return result;
  }, { 'nobody': nobody() });
}
