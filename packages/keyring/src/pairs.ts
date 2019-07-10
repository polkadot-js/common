// Copyright 2017-2019 @polkadot/keyring authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { KeyringPairs, KeyringPair } from './types';

import { assert, isHex, isU8a, u8aToHex, u8aToU8a } from '@polkadot/util';
import { decodeAddress } from '@polkadot/util-crypto';

interface KeyringPairMap {
  // @ts-ignore we use coercion :(
  [index: Uint8Array]: KeyringPair;
}

export default class Pairs implements KeyringPairs {
  private _map: KeyringPairMap;

  public constructor () {
    this._map = {};
  }

  public add (pair: KeyringPair): KeyringPair {
    // @ts-ignore we use coercion :(
    this._map[pair.publicKey] = pair;

    return pair;
  }

  public all (): KeyringPair[] {
    return Object.values(this._map);
  }

  public get (address: string | Uint8Array): KeyringPair {
    // @ts-ignore we use coercion :(
    const pair = this._map[decodeAddress(address)];

    assert(pair, (): string => {
      const formatted: string = isU8a(address) || isHex(address)
        ? u8aToHex(u8aToU8a(address))
        : address;

      return `Unable to retrieve keypair '${formatted}'`;
    });

    return pair;
  }

  public remove (address: string | Uint8Array): void {
    // @ts-ignore we use coercion :(
    delete this._map[decodeAddress(address)];
  }
}
