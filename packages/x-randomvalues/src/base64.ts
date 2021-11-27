// Copyright 2017-2021 @polkadot/x-randomvalues authors & contributors
// SPDX-License-Identifier: Apache-2.0

// A tiny base64 decoder for RN usage when atob is not available.
// The alternative would be to rely on Buffer with 'base64'

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

export function base64Decode (data: string): Uint8Array {
  const bytes = [];
  let byte = 0;
  let bits = 0;

  for (let i = 0; i < data.length && data[i] !== '='; i++) {
    // each character represents 6 bits
    byte = (byte << 6) | chars.indexOf(data[i]);

    // each byte needs to contain 8 bits
    if ((bits += 6) >= 8) {
      bytes.push((byte >>> (bits -= 8)) & 0xff);
    }
  }

  return Uint8Array.from(bytes);
}
