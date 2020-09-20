// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import validate from './validate';

export default function isBase58 (value?: string | null, ipfsCompat?: boolean): boolean {
  try {
    return validate(value, ipfsCompat);
  } catch (error) {
    return false;
  }
}
