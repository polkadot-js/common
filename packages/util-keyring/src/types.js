// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

export type KeyringPairEncrypted$Cipher = 'xsalsa20-poly1305';

export type KeyringPairEncrypted = {
  crypto: {
    cipher: KeyringPairEncrypted$Cipher,
    params: {
      nonce: Uint8Array
    },
    kdf: {
      rounds: number,
      salt: Uint8Array
    },
    text: Uint8Array
  },
  publicKey: Uint8Array,
};

export type KeyringPair = {
  publicKey: Uint8Array,

  decryptSelf: (box: KeyringPairEncrypted, secret: string) => void,
  encryptSelf: (secret: string) => KeyringPairEncrypted,
  sign (message: Uint8Array): Uint8Array,
  verify (message: Uint8Array, signature: Uint8Array): boolean
};

export type KeyringPairs = {
  add: (pair: KeyringPair) => KeyringPair,
  all: () => Array<KeyringPair>,
  get: (publicKey: Uint8Array) => ?KeyringPair
};

export type KeyringInstance = {
  addFromSeed (seed: Uint8Array | string): KeyringPair,
  getPair (publicKey: Uint8Array): ?KeyringPair,
  getPairs (): Array<KeyringPair>,
  getPublicKeys (): Array<Uint8Array>
};
