// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { EncryptedJson, EncryptedJsonContent } from './types';

import { base64Encode } from '../base64';
import { ENCODING } from './constants';

export function jsonEncryptFormat (encoded: Uint8Array, content: EncryptedJsonContent, contentExtra: string, isEncrypted: boolean): EncryptedJson {
  return {
    encoded: base64Encode(encoded),
    encoding: {
      content: [content, contentExtra],
      type: isEncrypted
        ? ENCODING
        : ['none'],
      version: '3'
    }
  };
}
