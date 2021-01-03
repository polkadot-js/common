// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { base32Validate } from './validate';

export function testValidator (validate: (value?: string | null, ipfsCompat?: boolean) => boolean, value?: string | null, ipfsCompat?: boolean): boolean {
  try {
    return validate(value, ipfsCompat);
  } catch (error) {
    return false;
  }
}

export function isBase32 (value?: string | null, ipfsCompat?: boolean): boolean {
  return testValidator(base32Validate, value, ipfsCompat);
}
