// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { assert, bufferToU8a } from '@polkadot/util';

import { bs58 } from './bs58';
import validate from './validate';

/**
 * @name base58Decode
 * @summary Decodes a base58 value.
 * @description
 * From the provided input, decode the base58 and return the result as an `Uint8Array`.
 */
export default function base58Decode (value: string, ipfsCompat = false): Uint8Array {
  if (ipfsCompat) {
    assert(value[0] === 'z', "Expected IPFS base32 identifier 'z' at string start");

    value = value.substr(1);
  }

  validate(value);

  return bufferToU8a(bs58.decode(value));
}
