// Copyright 2017-2019 @polkadot/keyring authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { KeyringInstance, PairType } from './types';

import { stringToU8a } from '@polkadot/util/index';

import Keyring from './index';

function padSeed (seed: string): Uint8Array {
  return stringToU8a(seed.padEnd(32));
}

const SEEDS: { [index: string ]: Uint8Array } = {
  alice:
    padSeed('Alice'),
  bob:
    padSeed('Bob'),
  charlie:
    padSeed('Charlie'),
  dave:
    padSeed('Dave'),
  eve:
    padSeed('Eve'),
  ferdie:
    padSeed('Ferdie')
  // NOTE These were originally part of tests, don't remove completely (yet), first check impact
  // one:
  //   padSeed('12345678901234567890123456789012'),
  // two:
  //   hexToU8a('0x9d61b19deffd5a60ba844af492ec2cc44449c5697b326919703bac031cae7f60')
};

/**
 * @name testKeyring
 * @signature testKeyring (): KeyringInstance
 * @summary Create an instance of Keyring pre-populated with locked test accounts
 * @description The test accounts (i.e. alice, bob, dave, eve, ferdie)
 * are available on the dev chain and each test account is initialised with DOT funds.
 * @example
 * <BR>
 *
 * ```javascript
 * import testKeyring from '@polkadot/keyring/testing';
 *
 * // Create an instance of Keyring that includes test accounts
 * const keyring = testingPairs();
 *
 * // Retrieve the address of one of the test accounts
 * const addressAlice = keyring.alice.address();
 *
 * // Retrieve the public key of one of the test accounts
 * const publicKeyAlice = keyring.alice.publicKey();
 * ```
 */
export default function testKeyring (type: PairType): KeyringInstance {
  const keyring = new Keyring(type);

  Object
    .keys(SEEDS)
    .forEach((name) => {
      const pair = keyring.addFromSeed(SEEDS[name], {
        isTesting: true,
        name
      });

      pair.lock = () => {
        // we don't have lock/unlock functionality here
      };
    });

  return keyring;
}
