// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { KeyringPairs, KeyringPair } from './types';

type KeyringPairMap = {
  [Uint8Array]: KeyringPair
};

const assert = require('@polkadot/util/assert');
const u8aToHex = require('@polkadot/util/u8a/toHex');

module.exports = function pairs (): KeyringPairs {
  const self: KeyringPairMap = {};

  return {
    add: (pair: KeyringPair): KeyringPair => {
      self[pair.publicKey()] = pair;

      return pair;
    },
    all: (): Array<KeyringPair> =>
      // flowlint-next-line unclear-type:off
      ((Object.values(self): any): Array<KeyringPair>),
    get: (publicKey: Uint8Array): KeyringPair => {
      const pair = self[publicKey];

      assert(pair, `Unable to retrieve keypair for publicKey '${u8aToHex(publicKey)}'`);

      return pair;
    }
  };
};
