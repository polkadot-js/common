// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { KeyringPair } from './types';

type TestKeyring = {
  [string]: KeyringPair
};

const createKeyring = require('./index');

function padSeed (seed: string): string {
  return seed.length < 32
    ? padSeed(`${seed} `)
    : seed;
}

const SEEDS = {
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
    padSeed('Ferdie'),
  one:
    '12345678901234567890123456789012',
  two:
    '0x9d61b19deffd5a60ba844af492ec2cc44449c5697b326919703bac031cae7f60'
};

module.exports = function testKeyring (): TestKeyring {
  const keyring = createKeyring();

  return Object
    .keys(SEEDS)
    .reduce((result, key) => {
      result[key] = keyring.addFromSeed(SEEDS[key]);

      return result;
    }, {});
};
