// Copyright 2017-2019 @polkadot/keyring authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { KeyringInstance, KeyringOptions } from './types';

import Keyring from '.';

// As per substrate
// const DEV_PHRASE = 'bottom drive obey lake curtain smoke basket hold race lonely fit walk';
// created from the above
const DEV_SEED = '0xfac7959dbfe72f052e5a0c3c8d6530f202b02fd8f9f5ca3580ec8deb7797479e';
const SEEDS = ['Alice', 'Bob', 'Charlie', 'Dave', 'Eve', 'Ferdie'];

/**
 * @name testKeyring
 * @summary Create an instance of Keyring pre-populated with locked test accounts
 * @description The test accounts (i.e. alice, bob, dave, eve, ferdie)
 * are available on the dev chain and each test account is initialised with DOT funds.
 */
export default function testKeyring (options: KeyringOptions = {}, isDerived: boolean = true): KeyringInstance {
  options.type = options.type || (isDerived ? 'sr25519' : 'ed25519');

  const keyring = new Keyring(options);

  SEEDS.forEach((entry) => {
    const phrase = isDerived
      ? `${DEV_SEED}//${entry}`
      : entry;
    const pair = keyring.addFromUri(phrase, {
      isTesting: true,
      name: entry.toLowerCase()
    }, isDerived ? 'sr25519' : options.type);

    pair.lock = () => {
      // we don't have lock/unlock functionality here
    };
  });

  return keyring;
}
