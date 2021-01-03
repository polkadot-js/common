// Copyright 2017-2021 @polkadot/x-textencoder authors & contributors
// SPDX-License-Identifier: Apache-2.0

// This is very limited, only handling Ascii values
export class TextEncoder {
  encode (value: string): Uint8Array {
    const u8a = new Uint8Array(value.length);

    for (let i = 0; i < value.length; i++) {
      u8a[i] = value.charCodeAt(i);
    }

    return u8a;
  }
}
