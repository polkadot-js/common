// Copyright 2017-2023 @polkadot/x-randomvalues authors & contributors
// SPDX-License-Identifier: Apache-2.0

// A tiny base64 decoder for RN usage when atob is not available.
// The alternative would be to rely on Buffer with 'base64'
//
//   Uint8Array.from(Buffer.from(data, 'base64'))
//
// We provide an own (tiny) decoder to not have Buffer deps

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const map = new Uint8Array(256);

// We use charCodeAt for access here and in the decoder loop - this is faster
// on lookups (array + numbers) and also faster than accessing the specific
// character via data[i] (around a 50% improvement on perf tests)
for (let i = 0; i < chars.length; i++) {
  map[chars.charCodeAt(i)] = i;
}

export function base64Decode (data: string): Uint8Array {
  const bytes = [];
  let byte = 0;
  let bits = 0;

  for (let i = 0; i < data.length && data[i] !== '='; i++) {
    // each character represents 6 bits
    byte = (byte << 6) | map[data.charCodeAt(i)];

    // each byte needs to contain 8 bits
    if ((bits += 6) >= 8) {
      bytes.push((byte >>> (bits -= 8)) & 0xff);
    }
  }

  return Uint8Array.from(bytes);
}
