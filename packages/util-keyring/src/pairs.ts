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
  // @ts-ignore we use coercion :(
  [index: Uint8Array]: KeyringPair
};

export default function pairs (): KeyringPairs {
  const self: KeyringPairMap = {};

  return {
    add: (pair: KeyringPair): KeyringPair => {
      // @ts-ignore we use coercion :(
      self[pair.publicKey()] = pair;

      return pair;
    },
    all: (): Array<KeyringPair> =>
      Object.values(self),
    get: (address: string | Uint8Array): KeyringPair => {
      // @ts-ignore we use coercion :(
      const pair = self[addressDecode(address)];

      assert(pair, () => {
        const formatted: string = isU8a(address) || isHex(address)
          ? u8aToHex(u8aToU8a(address))
          : (address as string);

        return `Unable to retrieve keypair '${formatted}'`;
      });

      return pair;
    },
    remove: (address: string | Uint8Array): void => {
      // @ts-ignore we use coercion :(
      delete self[addressDecode(address)];
    }
  };
}
