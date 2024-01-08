// Copyright 2017-2024 @polkadot/x-textencoder authors & contributors
// SPDX-License-Identifier: Apache-2.0

// This is very limited, only handling Ascii values
export class TextEncoder {
  encode (value: string): Uint8Array {
    const count = value.length;
    const u8a = new Uint8Array(count);

    for (let i = 0; i < count; i++) {
      u8a[i] = value.charCodeAt(i);
    }

    return u8a;
  }
}
