// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

export type KeyringPair = {
  id: string,
  publicKey: Uint8Array,

  sign (message: Uint8Array): Uint8Array,
  verify (message: Uint8Array, signature: Uint8Array): boolean
};

export type KeyringInstance = {
  addFromSeed (seed: Uint8Array | string): KeyringPair,
  getPair (publicKey: Uint8Array): ?KeyringPair,
  getPairs (): Array<KeyringPair>,
  getPublicKeys (): Array<Uint8Array>
};
