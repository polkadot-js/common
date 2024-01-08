// Copyright 2017-2024 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@polkadot/util/types';
import type { EncryptedJson, Keypair, KeypairType, Prefix } from '@polkadot/util-crypto/types';

export interface KeyringOptions {
  /** The ss58Format to use for address encoding (defaults to 42) */
  ss58Format?: Prefix;
  /** The type of keyring to create (defaults to ed25519) */
  type?: KeypairType;
}

export interface KeyringPair$MetaHardware {
  accountIndex?: number;
  accountOffset?: number;
  addressOffset?: number;
  hardwareType?: 'ledger';
}

export interface KeyringPair$MetaFlags {
  isDefaultAuthSelected?: boolean;
  isExternal?: boolean;
  isHardware?: boolean;
  isHidden?: boolean;
  isInjected?: boolean;
  isMultisig?: boolean;
  isProxied?: boolean;
  isRecent?: boolean;
  isTesting?: boolean;
}

export interface KeyringPair$MetaContract {
  abi: string;
  genesisHash?: HexString | null;
}

export interface KeyringPair$MetaExtension {
  source?: string;
}

export interface KeyringPair$MetaMultisig {
  threshold?: number;
  who?: string[];
}

export interface KeyringPair$MetaParent {
  parentAddress?: string;
  parentName?: string;
}

export interface KeyringPair$Meta extends KeyringPair$MetaExtension, KeyringPair$MetaFlags, KeyringPair$MetaHardware, KeyringPair$MetaMultisig, KeyringPair$MetaParent {
  address?: string;
  contract?: KeyringPair$MetaContract;
  genesisHash?: HexString | null;
  name?: string;
  suri?: string;
  tags?: string[];
  type?: KeypairType;
  whenCreated?: number;
  whenEdited?: number;
  whenUsed?: number;

  [key: string]: unknown;
}

export interface KeyringPair$Json extends EncryptedJson {
  /** The ss58 encoded address or the hex-encoded version (the latter is for ETH-compat chains) */
  address: string;
  /** The underlying metadata associated with the keypair */
  meta: KeyringPair$Meta;
}

export interface SignOptions {
  /** Create a MultiSignature-compatible output with an indicator type */
  withType?: boolean;
}

export interface KeyringPair {
  readonly address: string;
  readonly addressRaw: Uint8Array;
  readonly meta: KeyringPair$Meta;
  readonly isLocked: boolean;
  readonly publicKey: Uint8Array;
  readonly type: KeypairType;

  decodePkcs8 (passphrase?: string, encoded?: Uint8Array): void;
  derive (suri: string, meta?: KeyringPair$Meta): KeyringPair;
  encodePkcs8 (passphrase?: string): Uint8Array;
  lock (): void;
  setMeta (meta: KeyringPair$Meta): void;
  sign (message: string | Uint8Array, options?: SignOptions): Uint8Array;
  toJson (passphrase?: string): KeyringPair$Json;
  unlock (passphrase?: string): void;
  verify (message: string | Uint8Array, signature: Uint8Array, signerPublic: string | Uint8Array): boolean;
  vrfSign (message: string | Uint8Array, context?: string | Uint8Array, extra?: string | Uint8Array): Uint8Array;
  vrfVerify (message: string | Uint8Array, vrfResult: Uint8Array, signerPublic: string | Uint8Array, context?: string | Uint8Array, extra?: string | Uint8Array): boolean;
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
  addFromPair (pair: Keypair, meta?: KeyringPair$Meta, type?: KeypairType): KeyringPair
  addFromSeed (seed: Uint8Array, meta?: KeyringPair$Meta, type?: KeypairType): KeyringPair;
  addFromUri (suri: string, meta?: KeyringPair$Meta, type?: KeypairType): KeyringPair;
  createFromJson (json: KeyringPair$Json, ignoreChecksum?: boolean): KeyringPair;
  createFromPair (pair: Keypair, meta: KeyringPair$Meta, type: KeypairType): KeyringPair
  createFromUri (suri: string, meta?: KeyringPair$Meta, type?: KeypairType): KeyringPair;
  getPair (address: string | Uint8Array): KeyringPair;
  getPairs (): KeyringPair[];
  getPublicKeys (): Uint8Array[];
  removePair (address: string | Uint8Array): void;
  toJson (address: string | Uint8Array, passphrase?: string): KeyringPair$Json;
}
