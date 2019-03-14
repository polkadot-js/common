// Copyright 2017-2019 @polkadot/keyring authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { KeyringInstance, KeyringOptions } from './types';

import Keyring from '.';

const DEV_PHRASE = 'bottom drive obey lake curtain smoke basket hold race lonely fit walk';
const SEEDS = ['Alice', 'Bob', 'Charlie', 'Dave', 'Eve', 'Ferdie'];

/**
 * @name testKeyring
 * @summary Create an instance of Keyring pre-populated with locked test accounts
 * @description The test accounts (i.e. alice, bob, dave, eve, ferdie)
 * are available on the dev chain and each test account is initialised with DOT funds.
 */
export default function testKeyring (options?: KeyringOptions, isDerived: boolean = true): KeyringInstance {
  const keyring = new Keyring(options);

  SEEDS.forEach((entry) => {
    const phrase = isDerived
      ? `${DEV_PHRASE}//${entry}`
      : entry;
    const pair = keyring.addFromUri(phrase, {
      isTesting: true,
      name: entry.toLowerCase()
    }, isDerived ? 'sr25519' : 'ed25519');

    pair.lock = () => {
      // we don't have lock/unlock functionality here
    };
  });

  return keyring;
}
