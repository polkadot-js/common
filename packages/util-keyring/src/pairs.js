// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { KeyringPairs, KeyringPair } from './types';

type KeyringPairMap = {
  [Uint8Array]: KeyringPair
};

const assert = require('@polkadot/util/assert');
const isHex = require('@polkadot/util/is/hex');
const isU8a = require('@polkadot/util/is/u8a');
const u8aToHex = require('@polkadot/util/u8a/toHex');
const u8aToU8a = require('@polkadot/util/u8a/toU8a');

const addressDecode = require('./address/decode');

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
    get: (address: string | Uint8Array): KeyringPair => {
      const pair = self[addressDecode(address)];

      assert(pair, () => {
        const formatted: string = isU8a(address) || isHex(address)
          ? u8aToHex(u8aToU8a(address))
          // flowlint-next-line unclear-type:off
          : ((address: any): string);

        return `Unable to retrieve keypair '${formatted}'`;
      });

      return pair;
    },
    remove: (address: string | Uint8Array): void => {
      delete self[addressDecode(address)];
    }
  };
};
