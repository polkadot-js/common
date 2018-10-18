// Copyright 2017-2018 @polkadot/keyring authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { KeyringInstance } from './types';

import stringToU8a from '@polkadot/util/string/toU8a';

import Keyring from './index';

function padSeed (seed: string): Uint8Array {
  return stringToU8a(seed.padEnd(32, ' '));
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

export default function testKeyring (): KeyringInstance {
  const keyring = new Keyring();

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
