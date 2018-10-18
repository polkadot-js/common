// Copyright 2017-2018 @polkadot/keyring authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { KeyringInstance, KeyringPair, KeyringPair$Json, KeyringPair$Meta } from './types';

import { hexToU8a } from '@polkadot/util/index';
import { mnemonicToSeed , naclKeypairFromSeed } from '@polkadot/util-crypto/index';

import { decodeAddress, encodeAddress, setAddressPrefix } from './address';
import createPair from './pair';
import Pairs from './pairs';

export default class Keyring implements KeyringInstance {
  private _pairs: Pairs;

  constructor () {
    this._pairs = new Pairs();
  }

  addPair (pair: KeyringPair): KeyringPair {
    return this._pairs.add(pair);
  }

  addFromAddress (address: string | Uint8Array, meta?: KeyringPair$Meta, defaultEncoded?: Uint8Array): KeyringPair {
    // @ts-ignore no secretKey - cannot unlock
    return this.addPair(createPair({ publicKey: decodeAddress(address) }, meta, defaultEncoded));
  }

  addFromJson ({ address, encoded, meta }: KeyringPair$Json): KeyringPair {
    return this.addFromAddress(address, meta, hexToU8a(encoded));
  }

  addFromMnemonic (mnemonic: string, meta?: KeyringPair$Meta): KeyringPair {
    return this.addFromSeed(mnemonicToSeed(mnemonic), meta);
  }

  addFromSeed (seed: Uint8Array, meta?: KeyringPair$Meta): KeyringPair {
    return this.addPair(createPair(naclKeypairFromSeed(seed), meta));
  }

  getPair (address: string | Uint8Array): KeyringPair {
    return this._pairs.get(address);
  }

  getPairs (): Array<KeyringPair> {
    return this._pairs.all();
  }

  getPublicKeys (): Array<Uint8Array> {
    return this._pairs
      .all()
      .map(({ publicKey }) =>
        publicKey()
      );
  }

  removePair (address: string | Uint8Array): void {
    this._pairs.remove(address);
  }

  toJson (address: string | Uint8Array, passphrase?: string): KeyringPair$Json {
    return this._pairs.get(address).toJson(passphrase);
  }
}

export { Keyring, decodeAddress, encodeAddress, setAddressPrefix };
