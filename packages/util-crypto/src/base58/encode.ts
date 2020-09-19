// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { u8aToBuffer, u8aToU8a } from '@polkadot/util';

import { bs58 } from './bs58';

/**
 * @name base58Encode
 * @summary Creates a base58 value.
 * @description
 * From the provided input, create the base58 and return the result as a string.
 */
export default function base58Encode (value: Uint8Array | string | Buffer | number[], ipfsCompat?: boolean): string {
  const out = bs58.encode(
    u8aToBuffer(u8aToU8a(value))
  );

  return ipfsCompat
    ? `z${out}`
    : out;
}
