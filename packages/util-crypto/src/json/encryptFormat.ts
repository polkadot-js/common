// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { EncryptedJson, EncryptedJsonContent } from './types';

import { base64Encode } from '../base64';
import { ENCODING, ENCODING_NONE, ENCODING_VERSION } from './constants';

export function jsonEncryptFormat (encoded: Uint8Array, content: EncryptedJsonContent, contentExtra: string, isEncrypted: boolean): EncryptedJson {
  return {
    encoded: base64Encode(encoded),
    encoding: {
      content: [content, contentExtra],
      type: isEncrypted
        ? ENCODING
        : ENCODING_NONE,
      version: ENCODING_VERSION
    }
  };
}
