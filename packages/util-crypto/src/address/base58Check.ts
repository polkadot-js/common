// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

// copied from bs58
const BASE58_ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

export default function base58Check (value: string): [boolean, string | null] {
  for (let i = 0; i < value.length; i++) {
    if (!BASE58_ALPHABET.includes(value[i])) {
      return [false, `Invalid base58 character "${value[i]}" at index ${i}`];
    }
  }

  return [true, null];
}
