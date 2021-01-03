// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { base64Validate } from './validate';

export function isBase64 (value?: string | null): boolean {
  try {
    return base64Validate(value);
  } catch (error) {
    return false;
  }
}
