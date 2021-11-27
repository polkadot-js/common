// Copyright 2017-2021 @polkadot/x-randomvalues authors & contributors
// SPDX-License-Identifier: Apache-2.0

// a tiny base64 decoder for RN usage

const ALPHABET =
'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

export function base64Decode (data: string): Uint8Array {
  const bytes = [];
  let byte = 0;
  let bits = 0;

  for (let i = 0; i < data.length && data[i] !== '='; i++) {
    // each character represents 6 bits
    bits += 6;
    byte = (byte << 6) + ALPHABET.indexOf(data[i]);

    // each byte needs to contain 8 bits
    if (bits >= 8) {
      bytes.push((byte >>> (bits -= 8)) & 0xff);
    }
  }

  return Uint8Array.from(bytes);
}
