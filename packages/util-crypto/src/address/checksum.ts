// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { assert } from '@polkadot/util';

import { sshash } from './sshash';

export function checkAddressChecksum (decoded: Uint8Array): [boolean, number, number, number] {
  assert((decoded[0] & 0b1000_0000) === 0, 'Invalid ssPrefix byte received, expected <= 127');

  const ss58Length = (decoded[0] & 0b0100_0000) ? 2 : 1;
  const ss58Decoded = ss58Length === 1
    ? decoded[0]
    : (((decoded[0] & 0b00111111) << 2) | (decoded[1] >> 6)) | ((decoded[1] & 0b00111111) << 8);
  const isPublicKey = [34 + ss58Length, 35 + ss58Length].includes(decoded.length);

  // non-publicKeys has 1 byte checksums, else default to 2
  const length = decoded.length - (isPublicKey ? 2 : 1);

  // calculate the hash and do the checksum byte checks
  const hash = sshash(decoded.subarray(0, length));

  // see if the hash actually matches
  const isValid = isPublicKey
    ? decoded[decoded.length - 2] === hash[0] && decoded[decoded.length - 1] === hash[1]
    : decoded[decoded.length - 1] === hash[0];

  return [isValid, length, ss58Length, ss58Decoded];
}
