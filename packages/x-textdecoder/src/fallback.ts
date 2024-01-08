// Copyright 2017-2024 @polkadot/x-textencoder authors & contributors
// SPDX-License-Identifier: Apache-2.0

// This is very limited, only handling Ascii values
export class TextDecoder {
  __encoding?: string;

  constructor (encoding?: 'utf-8' | 'utf8') {
    this.__encoding = encoding;
  }

  decode (value: Uint8Array): string {
    let result = '';

    for (let i = 0, count = value.length; i < count; i++) {
      result += String.fromCharCode(value[i]);
    }

    return result;
  }
}
