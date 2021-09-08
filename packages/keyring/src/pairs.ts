// Copyright 2017-2021 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@polkadot/util/types';
import type { KeyringPair, KeyringPairs } from './types';

import { assert, isHex, isU8a, u8aToHex, u8aToU8a } from '@polkadot/util';
import { decodeAddress } from '@polkadot/util-crypto';

type KeyringPairMap = Record<string, KeyringPair>;

export class Pairs implements KeyringPairs {
  readonly #map: KeyringPairMap = {};

  public add (pair: KeyringPair): KeyringPair {
    this.#map[decodeAddress(pair.address).toString()] = pair;

    return pair;
  }

  public all (): KeyringPair[] {
    return Object.values(this.#map);
  }

  public get (address: HexString | string | Uint8Array): KeyringPair {
    const pair = this.#map[decodeAddress(address).toString()];

    assert(pair, () => `Unable to retrieve keypair '${
      isU8a(address) || isHex(address)
        ? u8aToHex(u8aToU8a(address))
        : address
    }'`);

    return pair;
  }

  public remove (address: HexString | string | Uint8Array): void {
    delete this.#map[decodeAddress(address).toString()];
  }
}
