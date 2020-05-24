// Copyright 2017-2020 @polkadot/keyring authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Prefix } from '@polkadot/util-crypto/address/types';
import { KeypairType } from '@polkadot/util-crypto/types';

export interface KeyringOptions {
  ss58Format?: Prefix;
  type?: KeypairType;
}

export type KeyringPair$Meta = Record<string, unknown>;

export type KeyringPair$JsonVersion = '0' | '1' | '2';

export interface KeyringPair$JsonEncoding {
  content: ['pkcs8', KeypairType];
  type: 'xsalsa20-poly1305' | 'none';
  version: KeyringPair$JsonVersion;
}

export interface KeyringPair$Json {
  address: string;
  encoded: string;
  encoding: KeyringPair$JsonEncoding;
  meta: KeyringPair$Meta;
}

export interface SignOptions {
  withType?: boolean;
}

export interface KeyringPair {
  readonly address: string;
  readonly meta: KeyringPair$Meta;
  readonly isLocked: boolean;
  readonly publicKey: Uint8Array;
  readonly type: KeypairType;

  decodePkcs8: (passphrase?: string, encoded?: Uint8Array) => void;
  derive: (suri: string, meta?: KeyringPair$Meta) => KeyringPair;
  encodePkcs8: (passphrase?: string) => Uint8Array;
  lock: () => void;
  setMeta: (meta: KeyringPair$Meta) => void;
  sign (message: Uint8Array, options?: SignOptions): Uint8Array;
  toJson (passphrase?: string): KeyringPair$Json;
  verify (message: Uint8Array, signature: Uint8Array): boolean;
}

export interface KeyringPairs {
  add: (pair: KeyringPair) => KeyringPair;
  all: () => KeyringPair[];
  get: (address: string | Uint8Array) => KeyringPair;
  remove: (address: string | Uint8Array) => void;
}

export interface KeyringInstance {
  readonly pairs: KeyringPair[];
  readonly publicKeys: Uint8Array[];
  readonly type: KeypairType;

  decodeAddress (encoded: string | Uint8Array, ignoreChecksum?: boolean, ss58Format?: Prefix): Uint8Array;
  encodeAddress (key: Uint8Array | string, ss58Format?: Prefix): string;
  setSS58Format (ss58Format: Prefix): void;

  addPair (pair: KeyringPair): KeyringPair;
  addFromAddress (address: string | Uint8Array, meta?: KeyringPair$Meta, encoded?: Uint8Array | null, type?: KeypairType, ignoreChecksum?: boolean): KeyringPair;
  addFromJson (pair: KeyringPair$Json, ignoreChecksum?: boolean): KeyringPair;
  addFromMnemonic (mnemonic: string, meta?: KeyringPair$Meta, type?: KeypairType): KeyringPair;
  addFromSeed (seed: Uint8Array, meta?: KeyringPair$Meta, type?: KeypairType): KeyringPair;
  addFromUri (suri: string, meta?: KeyringPair$Meta, type?: KeypairType): KeyringPair;
  createFromUri (suri: string, meta?: KeyringPair$Meta, type?: KeypairType): KeyringPair;
  getPair (address: string | Uint8Array): KeyringPair;
  getPairs (): KeyringPair[];
  getPublicKeys (): Uint8Array[];
  removePair (address: string | Uint8Array): void;
  toJson (address: string | Uint8Array, passphrase?: string): KeyringPair$Json;
}
