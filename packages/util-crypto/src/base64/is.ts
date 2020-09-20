// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import validate from './validate';

export default function isBase64 (value?: string | null): boolean {
  try {
    return validate(value);
  } catch (error) {
    return false;
  }
}
