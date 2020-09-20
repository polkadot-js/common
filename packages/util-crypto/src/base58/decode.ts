// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { bufferToU8a } from '@polkadot/util';

import { bs58 } from './bs58';
import validate from './validate';

/**
 * @name base58Decode
 * @summary Decodes a base58 value.
 * @description
 * From the provided input, decode the base58 and return the result as an `Uint8Array`.
 */
export default function base58Decode (value: string, ipfsCompat?: boolean): Uint8Array {
  validate(value, ipfsCompat);

  return bufferToU8a(bs58.decode(value.substr(ipfsCompat ? 1 : 0)));
}
