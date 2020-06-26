// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import bs58 from 'bs58';
import { bufferToU8a } from '@polkadot/util';

// copied from bs58
const BASE58_ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

/**
 * @name base58Decode
 * @summary Decodes a base58 value.
 * @description
 * From the provided input, decode the base58 and return the result as an `Uint8Array`.
 */
export default function base58Decode (value: string): Uint8Array {
  for (let i = 0; i < value.length; i++) {
    if (!BASE58_ALPHABET.includes(value[i])) {
      throw new Error(`Invalid base58 character "${value[i]}" (0x${value.charCodeAt(i).toString(16)}) at index ${i}`);
    }
  }

  return bufferToU8a(bs58.decode(value));
}
