// Copyright 2020 @polkadot/x-textencoder authors & contributors
// SPDX-License-Identifier: Apache-2.0

export default typeof TextEncoder === 'undefined'
  ? class {
    encode (value: string): Uint8Array {
      const u8a = new Uint8Array(value.length);

      for (let i = 0; i < value.length; i++) {
        u8a[i] = value.charCodeAt(i);
      }

      return u8a;
    }
  }
  : TextEncoder;
