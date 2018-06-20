// Copyright 2017-2018 @polkadot/util-keyring authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { KeyringPair, KeyringInstance } from './types';

import createKeyring from './testing';
import nobody from './pair/nobody';

type TestKeyringMap = {
  _keyring: KeyringInstance,
  [string]: KeyringPair
};

export default function testKeyringPairs (): TestKeyringMap {
  const keyring = createKeyring();
  const pairs = keyring.getPairs();

  return pairs.reduce((result, pair) => {
    const { name } = pair.getMeta();

    result[(name: string)] = pair;

    return result;
  }, { _keyring: keyring, nobody: nobody() });
}
