// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

export type EncryptedJsonVersion = '0' | '1' | '2' | '3';

export type EncryptedJsonEncoding = 'none' | 'scrypt' | 'xsalsa20-poly1305';

export type EncryptedJsonContent = 'pkcs8';

export interface EncryptedJsonDescriptor {
  content: [EncryptedJsonContent, string];
  type: EncryptedJsonEncoding | EncryptedJsonEncoding[];
  version: EncryptedJsonVersion;
}

export interface EncryptedJson {
  encoded: string;
  encoding: EncryptedJsonDescriptor;
}
