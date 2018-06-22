// Copyright 2017-2018 @polkadot/util-keyring authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { KeyringInstance, KeyringPair, KeyringPair$Json, KeyringPair$Meta } from './types';

import naclKeypairFromSeed from '@polkadot/util-crypto/nacl/keypair/fromSeed';
import hexToU8a from '@polkadot/util/hex/toU8a';

import addressDecode from './address/decode';
import createPair from './pair';
import createPairs from './pairs';

export default function keyring (): KeyringInstance {
  const pairs = createPairs();
  const addFromAddress = (address: string | Uint8Array, meta?: KeyringPair$Meta, defaultEncoded?: Uint8Array) =>
    pairs.add(createPair({ publicKey: addressDecode(address) }, meta, defaultEncoded));

  return {
    addFromAddress,
    addFromJson: ({ address, encoded, meta }: KeyringPair$Json): KeyringPair =>
      addFromAddress(address, meta, hexToU8a(encoded)),
    addFromSeed: (seed: Uint8Array, meta?: KeyringPair$Meta): KeyringPair =>
      pairs.add(createPair(naclKeypairFromSeed(seed), meta)),
    getPair: (address: string | Uint8Array): KeyringPair =>
      pairs.get(address),
    getPairs: pairs.all,
    getPublicKeys: (): Array<Uint8Array> =>
      pairs.all().map(({ publicKey }) => publicKey()),
    removePair: (address: string | Uint8Array): void =>
      pairs.remove(address),
    toJson: (address: string | Uint8Array, passphrase?: string): KeyringPair$Json =>
      pairs.get(address).toJson(passphrase)
  };
}
