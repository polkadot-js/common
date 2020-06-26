// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Prefix } from './types';

import base58Decode from '../base58/decode';
import checkChecksum from './checkChecksum';
import defaults from './defaults';

/**
 * @name checkAddress
 * @summary Validates an ss58 address.
 * @description
 * From the provided input, validate that the address is a valid input.
 */
export default function check (address: string, prefix: Prefix): [boolean, string | null] {
  let decoded;

  try {
    decoded = base58Decode(address);
  } catch (error) {
    return [false, (error as Error).message];
  }

  if (decoded[0] !== prefix) {
    return [false, `Prefix mismatch, expected ${prefix}, found ${decoded[0]}`];
  } else if (!defaults.allowedEncodedLengths.includes(decoded.length)) {
    return [false, 'Invalid decoded address length'];
  }

  const [isValid] = checkChecksum(decoded);

  return [isValid, isValid ? null : 'Invalid decoded address checksum'];
}
