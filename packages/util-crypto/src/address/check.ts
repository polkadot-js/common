// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Prefix } from './types';

import { base58Decode } from '../base58/decode';
import { checkAddressChecksum } from './checksum';
import { defaults } from './defaults';

/**
 * @name checkAddress
 * @summary Validates an ss58 address.
 * @description
 * From the provided input, validate that the address is a valid input.
 */
export function checkAddress (address: string, prefix: Prefix): [boolean, string | null] {
  let decoded;

  try {
    decoded = base58Decode(address);
  } catch (error) {
    return [false, (error as Error).message];
  }

  const [isValid,,, ss58Decoded] = checkAddressChecksum(decoded);

  if (ss58Decoded !== prefix) {
    return [false, `Prefix mismatch, expected ${prefix}, found ${ss58Decoded}`];
  } else if (!defaults.allowedEncodedLengths.includes(decoded.length)) {
    return [false, 'Invalid decoded address length'];
  }

  return [isValid, isValid ? null : 'Invalid decoded address checksum'];
}
