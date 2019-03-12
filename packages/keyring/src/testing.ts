// Copyright 2017-2019 @polkadot/keyring authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { KeyringInstance, KeyringOptions, KeyringPair, KeyringPair$Meta } from './types';

import { stringToU8a } from '@polkadot/util/index';
import { keyExtract, keyFromPath, mnemonicToMiniSecret } from '@polkadot/util-crypto/index';

import Keyring from './index';

const DEV_PHRASE = 'bottom drive obey lake curtain smoke basket hold race lonely fit walk';
const SEEDS = ['Alice', 'Bob', 'Charlie', 'Dave', 'Eve', 'Ferdie'];

function generateHdKd (keyring: KeyringInstance, entry: string, meta: KeyringPair$Meta): KeyringPair {
  const { password, path, phrase } = keyExtract(`${DEV_PHRASE}//${entry}`);
  const seed = mnemonicToMiniSecret(phrase, password);

  return keyring.addFromSeed(keyFromPath(seed, path), meta);
}

function generateLegacy (keyring: KeyringInstance, entry: string, meta: KeyringPair$Meta): KeyringPair {
  return keyring.addFromSeed(stringToU8a(entry.padEnd(32)), meta);
}

/**
 * @name testKeyring
 * @summary Create an instance of Keyring pre-populated with locked test accounts
 * @description The test accounts (i.e. alice, bob, dave, eve, ferdie)
 * are available on the dev chain and each test account is initialised with DOT funds.
 */
export default function testKeyring (options?: KeyringOptions, isHdKd: boolean = false): KeyringInstance {
  const keyring = new Keyring(options);

  SEEDS.forEach((entry) => {
    const name = entry.toLowerCase();
    const meta = {
      isTesting: true,
      name
    };
    const pair = isHdKd
      ? generateHdKd(keyring, entry, meta)
      : generateLegacy(keyring, entry, meta);

    pair.lock = () => {
      // we don't have lock/unlock functionality here
    };
  });

  return keyring;
}
