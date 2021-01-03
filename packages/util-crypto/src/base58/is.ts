// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { testValidator } from '../base32/is';
import { base58Validate } from './validate';

export function isBase58 (value?: string | null, ipfsCompat?: boolean): boolean {
  return testValidator(base58Validate, value, ipfsCompat);
}
