// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Prefix } from './types';

import bs58 from 'bs58';

import checkChecksum from './checkChecksum';
import defaults from './defaults';

export default function check (address: string, prefix: Prefix): [boolean, string | null] {
  const decoded = bs58.decode(address);

  if (decoded[0] !== prefix) {
    return [false, `Prefix mismatch, expected ${prefix}, found ${decoded[0]}`];
  } else if (!defaults.allowedEncodedLengths.includes(decoded.length)) {
    return [false, 'Invalid decoded address length'];
  }

  const [isValid] = checkChecksum(decoded);

  return [isValid, isValid ? null : 'Invalid decoded address checksum'];
}
