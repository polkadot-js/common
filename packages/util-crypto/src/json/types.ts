// Copyright 2017-2023 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@polkadot/util/types';

export type EncryptedJsonVersion = '0' | '1' | '2' | '3';

export type EncryptedJsonEncoding = 'none' | 'scrypt' | 'xsalsa20-poly1305';

export interface EncryptedJsonDescriptor {
  content: string[];
  type: EncryptedJsonEncoding | EncryptedJsonEncoding[];
  version: EncryptedJsonVersion;
}

export interface EncryptedJson {
  encoded: HexString | string;
  encoding: EncryptedJsonDescriptor;
}
