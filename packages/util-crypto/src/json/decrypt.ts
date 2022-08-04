// Copyright 2017-2022 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { EncryptedJson } from './types';

import { hexToU8a, isHex } from '@polkadot/util';

import { base64Decode } from '../base64';
import { jsonDecryptData } from './decryptData';

export function jsonDecrypt ({ encoded, encoding }: EncryptedJson, passphrase?: string | null): Uint8Array {
  if (!encoded) {
    throw new Error('No encrypted data available to decode');
  }

  return jsonDecryptData(
    isHex(encoded)
      ? hexToU8a(encoded)
      : base64Decode(encoded),
    passphrase,
    Array.isArray(encoding.type)
      ? encoding.type
      : [encoding.type]
  );
}
