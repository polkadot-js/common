// Copyright 2017-2020 @polkadot/keyring authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { KeyringPairs, KeyringPair } from './types';

import { assert, isHex, isU8a, u8aToHex, u8aToU8a } from '@polkadot/util';
import { decodeAddress } from '@polkadot/util-crypto';

type KeyringPairMap = Record<string, KeyringPair>;

export default class Pairs implements KeyringPairs {
  readonly #map: KeyringPairMap = {};

  public add (pair: KeyringPair): KeyringPair {
    this.#map[decodeAddress(pair.address).toString()] = pair;

    return pair;
  }

  public all (): KeyringPair[] {
    return Object.values(this.#map);
  }

  public get (address: string | Uint8Array): KeyringPair {
    const pair = this.#map[decodeAddress(address).toString()];

    assert(pair, (): string => {
      const formatted: string = isU8a(address) || isHex(address)
        ? u8aToHex(u8aToU8a(address))
        : address;

      return `Unable to retrieve keypair '${formatted}'`;
    });

    return pair;
  }

  public remove (address: string | Uint8Array): void {
    delete this.#map[decodeAddress(address).toString()];
  }
}
