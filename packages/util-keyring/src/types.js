// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

export type KeyringPair = {
  decodePkcs8: (encoded: Uint8Array, passphrase: Uint8Array | string) => void,
  encodePkcs8: (passphrase: Uint8Array | string) => Uint8Array,
  publicKey: () => Uint8Array,
  sign (message: Uint8Array): Uint8Array,
  verify (message: Uint8Array, signature: Uint8Array): boolean
};

export type KeyringPairs = {
  add: (pair: KeyringPair) => KeyringPair,
  all: () => Array<KeyringPair>,
  get: (publicKey: Uint8Array) => ?KeyringPair
};

export type KeyringInstance = {
  addFromSeed (seed: Uint8Array): KeyringPair,
  decrypt (encrypted: Uint8Array, secret: Uint8Array | string): KeyringPair,
  encrypt (publicKey: Uint8Array, secret: Uint8Array | string): ?Uint8Array,
  getPair (publicKey: Uint8Array): ?KeyringPair,
  getPairs (): Array<KeyringPair>,
  getPublicKeys (): Array<Uint8Array>
};
