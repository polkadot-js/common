// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { KeyringInstance, KeyringPair } from './types';

const naclKeypairFromSeed = require('@polkadot/util-crypto/nacl/keypair/fromSeed');

const addressDecode = require('./address/decode');
const decrypt = require('./decrypt');
const encrypt = require('./encrypt');
const createPair = require('./pair');
const createPairs = require('./pairs');

module.exports = function keyring (): KeyringInstance {
  const pairs = createPairs();

  return {
    addFromSeed: (seed: Uint8Array): KeyringPair =>
      pairs.add(createPair(naclKeypairFromSeed(seed))),
    decrypt: (encrypted: Uint8Array, passphrase: Uint8Array | string): KeyringPair =>
      pairs.add(decrypt(encrypted, passphrase)),
    encrypt: (publicKey: Uint8Array, passphrase: Uint8Array | string): Uint8Array =>
      encrypt(pairs.get(publicKey), passphrase),
    getAddress: (address: string): KeyringPair =>
      pairs.get(
        addressDecode(address)
      ),
    getPair: (publicKey: Uint8Array): KeyringPair =>
      pairs.get(publicKey),
    getPairs: pairs.all,
    getPublicKeys: (): Array<Uint8Array> =>
      pairs.all().map(({ publicKey }) => publicKey())
  };
};
