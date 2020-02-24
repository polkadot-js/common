// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import sshash from './sshash';

export default function checkChecksum (decoded: Uint8Array): [boolean, number] {
  const isPublicKey = decoded.length === 35;

  // non-publicKeys has 1 byte checksums, else default to 2
  const length = decoded.length - (isPublicKey ? 2 : 1);

  // calculate the hash and do the checksum byte checks
  const hash = sshash(decoded.subarray(0, length));

  // see if the hash actually matches
  const isValid = isPublicKey
    ? decoded[decoded.length - 2] === hash[0] && decoded[decoded.length - 1] === hash[1]
    : decoded[decoded.length - 1] === hash[0];

  return [isValid, length];
}
