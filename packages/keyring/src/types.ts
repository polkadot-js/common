// Copyright 2017-2019 @polkadot/keyring authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Prefix } from './address/types';

export type PairType = 'ed25519' | 'sr25519';

export type KeyringPair$Meta = {
  [index: string]: any
};

export type KeyringPair$JsonVersion = '0' | '1';

export type KeyringPair$JsonEncoding = {
  content: 'pkcs8' | 'none',
  type: 'xsalsa20-poly1305' | 'none',
  version: KeyringPair$JsonVersion
};

export type KeyringPair$Json = {
  address: string,
  encoded: string,
  encoding: KeyringPair$JsonEncoding,
  meta: KeyringPair$Meta
};

export type KeyringPair = {
  address: () => string,
  decodePkcs8: (passphrase?: string, encoded?: Uint8Array) => void,
  encodePkcs8: (passphrase?: string) => Uint8Array,
  getMeta: () => KeyringPair$Meta,
  isLocked: () => boolean,
  lock: () => void,
  publicKey: () => Uint8Array,
  setMeta: (meta: KeyringPair$Meta) => void,
  sign (message: Uint8Array): Uint8Array,
  toJson (passphrase?: string): KeyringPair$Json,
  verify (message: Uint8Array, signature: Uint8Array): boolean
};

export interface KeyringPairs {
  add: (pair: KeyringPair) => KeyringPair;
  all: () => Array<KeyringPair>;
  get: (address: string | Uint8Array) => KeyringPair;
  remove: (address: string | Uint8Array) => void;
}

export interface KeyringInstance {
  decodeAddress (encoded: string | Uint8Array): Uint8Array;
  encodeAddress (key: Uint8Array | string): string;
  setAddressPrefix (prefix: Prefix): void;

  addPair (pair: KeyringPair): KeyringPair;
  addFromAddress (address: string | Uint8Array, meta: KeyringPair$Meta, encoded: Uint8Array | null, encoding: null): KeyringPair;
  addFromMnemonic (mnemonic: string, meta: KeyringPair$Meta): KeyringPair;
  addFromSeed (seed: Uint8Array, meta: KeyringPair$Meta): KeyringPair;
  addFromJson (pair: KeyringPair$Json): KeyringPair;
  getPair (address: string | Uint8Array): KeyringPair;
  getPairs (): Array<KeyringPair>;
  getPublicKeys (): Array<Uint8Array>;
  removePair (address: string | Uint8Array): void;
  toJson (address: string | Uint8Array, passphrase?: string): KeyringPair$Json;
}
