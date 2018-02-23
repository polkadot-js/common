// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { KeyringInstance, KeyringPair } from './types';

type KeyringPairMap = {
  [string]: KeyringPair
};

const naclKeypairFromSeed = require('@polkadot/util-crypto/nacl/keypair/fromSeed');
const u8aToString = require('@polkadot/util/u8a/toString');

const createPair = require('./pair');

module.exports = function keyring (): KeyringInstance {
  const pairs: KeyringPairMap = {};
  const getPairs = (): Array<KeyringPair> =>
    // flowlint-next-line unclear-type:off
    ((Object.values(pairs): any): Array<KeyringPair>);

  return {
    addFromSeed: (seed: Uint8Array | string): KeyringPair => {
      const pair = createPair(naclKeypairFromSeed(seed));

      pairs[pair.id] = pair;

      return pair;
    },
    getPair: (publicKey: Uint8Array): ?KeyringPair =>
      pairs[u8aToString(publicKey)],
    getPairs,
    getPublicKeys: (): Array<Uint8Array> =>
      getPairs().map(({ publicKey }) => publicKey)
  };
};
