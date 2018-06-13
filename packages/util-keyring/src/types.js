// Copyright 2017-2018 @polkadot/util-keyring authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

export type KeyringPair$Meta = {
  // flowlint-next-line unclear-type:off
  [string]: any
}

export type KeyringPair$Json = {
  address: string,
  encoded: string,
  encoding: {
    content: 'pkcs8' | 'none',
    type: 'xsalsa20-poly1305' | 'none',
    version: '0'
  },
  meta: KeyringPair$Meta
};

export type KeyringPair = {
  address: () => string,
  decodePkcs8: (passphrase?: string, encoded?: Uint8Array) => void,
  encodePkcs8: (passphrase?: string) => Uint8Array,
  getMeta: () => KeyringPair$Meta,
  hasSecretKey: () => boolean,
  publicKey: () => Uint8Array,
  setMeta: (meta: KeyringPair$Meta) => void,
  sign (message: Uint8Array): Uint8Array,
  toJson (passphrase?: string): KeyringPair$Json,
  verify (message: Uint8Array, signature: Uint8Array): boolean
};

export type KeyringPairs = {
  add: (pair: KeyringPair) => KeyringPair,
  all: () => Array<KeyringPair>,
  get: (address: string | Uint8Array) => KeyringPair,
  remove: (address: string | Uint8Array) => void
};

export type KeyringInstance = {
  addFromAddress (address: string | Uint8Array, meta?: KeyringPair$Meta): KeyringPair,
  addFromSeed (seed: Uint8Array, meta?: KeyringPair$Meta): KeyringPair,
  addFromJson (pair: KeyringPair$Json): KeyringPair,
  getPair (address: string | Uint8Array): KeyringPair,
  getPairs (): Array<KeyringPair>,
  getPublicKeys (): Array<Uint8Array>,
  removePair (address: string | Uint8Array): void
};
