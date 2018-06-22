// Copyright 2017-2018 @polkadot/util-keyring authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { KeyringPairs, KeyringPair } from './types';

import assert from '@polkadot/util/assert';
import isHex from '@polkadot/util/is/hex';
import isU8a from '@polkadot/util/is/u8a';
import u8aToHex from '@polkadot/util/u8a/toHex';
import u8aToU8a from '@polkadot/util/u8a/toU8a';

import addressDecode from './address/decode';

type KeyringPairMap = {
  [Uint8Array]: KeyringPair
};

export default function pairs (): KeyringPairs {
  const self: KeyringPairMap = {};

  return {
    add: (pair: KeyringPair): KeyringPair => {
      self[pair.publicKey()] = pair;

      return pair;
    },
    all: (): Array<KeyringPair> =>
      ((Object.values(self): any): Array<KeyringPair>),
    get: (address: string | Uint8Array): KeyringPair => {
      const pair = self[addressDecode(address)];

      assert(pair, () => {
        const formatted: string = isU8a(address) || isHex(address)
          ? u8aToHex(u8aToU8a(address))
          : ((address: any): string);

        return `Unable to retrieve keypair '${formatted}'`;
      });

      return pair;
    },
    remove: (address: string | Uint8Array): void => {
      delete self[addressDecode(address)];
    }
  };
}
