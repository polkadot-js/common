// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { base32 } from './bs32';
import { base32Validate } from './validate';

/**
 * @name base32Decode
 * @summary Delookup a base32 value.
 * @description
 * From the provided input, decode the base32 and return the result as an `Uint8Array`.
 */
export function base32Decode (value: string, ipfsCompat = false): Uint8Array {
  base32Validate(value, ipfsCompat);

  return base32.decode(
    ipfsCompat
      ? value.substr(1)
      : value
  );
}
