// Copyright 2017-2023 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

export type EncryptedJsonVersion = '0' | '1' | '2' | '3';

export type EncryptedJsonEncoding = 'none' | 'scrypt' | 'xsalsa20-poly1305';

export interface EncryptedJsonDescriptor {
  content: string[];
  type: EncryptedJsonEncoding | EncryptedJsonEncoding[];
  version: EncryptedJsonVersion;
}

export interface EncryptedJson {
  encoded: string;
  encoding: EncryptedJsonDescriptor;
}
