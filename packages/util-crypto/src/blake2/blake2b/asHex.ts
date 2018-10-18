// Copyright 2017-2018 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { u8aToHex } from '@polkadot/util/index';

import blake2bAsU8a from './asU8a';

/**
 * @name blake2bAsHex
 * @signature blake2bAsHex (value: Uint8Array): string
 * @summary Creates a blake2b hex string from the input.
 * @description
 * From a `Uint8Array` input, create the blake2b and return the result as a hex string.
 * @example
 *   import { blake2bAsHex } from '@polkadot/util-crypto';
 *
 *   blake2bAsHex('abc') // => '0xba80a53f981c4d0d6a2797b69f12f6e94c212f14685ac4b74b12bb6fdbffa2d17d87c5392aab792dc252d5de4533cc9518d38aa8dbf1925ab92386edd4009923'
 */
export default function blake2bAsHex (data: Uint8Array, bitLength: number = 512): string {
  return u8aToHex(
    blake2bAsU8a(data, bitLength)
  );
}
