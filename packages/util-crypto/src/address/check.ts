// Copyright 2017-2019 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Prefix } from './types';

import bs58 from 'bs58';

import defaults from './defaults';
import sshash from './sshash';

export default function check (address: string, prefix: Prefix): [boolean, string | null] {
  const decoded = bs58.decode(address);

  if (decoded[0] as Prefix !== prefix) {
    return [false, `Prefix mismatch, expected ${prefix}, found ${decoded[0]}`];
  } else if (!defaults.allowedEncodedLengths.includes(decoded.length)) {
    return [false, 'Invalid decoded address length'];
  }

  const isPublicKey = decoded.length === 35;

  // non-publicKeys has 1 byte checksums, else default to 2
  const endPos = decoded.length - (isPublicKey ? 2 : 1);

  // calculate the hash and do the checksum byte checks
  const hash = sshash(decoded.subarray(0, endPos));
  const checks = isPublicKey
    ? decoded[decoded.length - 2] === hash[0] && decoded[decoded.length - 1] === hash[1]
    : decoded[decoded.length - 1] === hash[0];

  return !checks
    ? [false, 'Invalid decoded address checksum']
    : [true, null];
}
