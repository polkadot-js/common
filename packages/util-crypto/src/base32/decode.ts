// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { BASE32_ALPHABET, BITS_PER_CHAR } from './bs32';
import validate from './validate';
import { assert } from '@polkadot/util';

// Build the character lookup table:
const lookup = BASE32_ALPHABET
  .split('')
  .reduce((lookup: Record<string, number>, char: string, index: number): Record<string, number> => {
    lookup[char] = index;

    return lookup;
  }, {});

/**
 * @name base32Decode
 * @summary Delookup a base32 value.
 * @description
 * From the provided input, decode the base32 and return the result as an `Uint8Array`.
 */
export default function base32Decode (value: string, ipfsCompat = false): Uint8Array {
  if (ipfsCompat) {
    assert(value[0] === 'b', "Expected IPFS base32 identifier 'b' at string start");

    value = value.substr(1);
  }

  validate(value);

  // Count the padding bytes:
  let end = value.length;

  while (value[end - 1] === '=') {
    --end;
  }

  // Allocate the output:
  const out = new Uint8Array((end * BITS_PER_CHAR / 8) | 0);

  // Parse the data:
  let bits = 0; // Number of bits currently in the buffer
  let buffer = 0; // Bits waiting to be written out, MSB first
  let written = 0; // Next byte to write

  for (let i = 0; i < end; ++i) {
    buffer = (buffer << BITS_PER_CHAR) | lookup[value[i]];
    bits += BITS_PER_CHAR;

    if (bits >= 8) {
      bits -= 8;
      out[written++] = 0xff & (buffer >> bits);
    }
  }

  // Verify that we have received just enough bits
  if (bits >= BITS_PER_CHAR || 0xff & (buffer << (8 - bits))) {
    throw new SyntaxError('Unexpected end of data');
  }

  return out;
}
