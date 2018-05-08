// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { KeyringInstance } from './types';

const hexToU8a = require('@polkadot/util/hex/toU8a');
const u8aFromString = require('@polkadot/util/u8a/fromString');

const createKeyring = require('./index');

function padSeed (seed: string): Uint8Array {
  return u8aFromString(seed.padEnd(32, ' '));
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
    padSeed('12345678901234567890123456789012'),
  two:
    hexToU8a('0x9d61b19deffd5a60ba844af492ec2cc44449c5697b326919703bac031cae7f60')
};

module.exports = function testKeyring (): KeyringInstance {
  const keyring = createKeyring();

  Object
    .keys(SEEDS)
    .forEach((name) => {
      keyring.addFromSeed(SEEDS[name], {
        isTesting: true,
        name
      });
    });

  return keyring;
};
