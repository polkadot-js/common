// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@polkadot/util/types';
import type { Prefix } from './types';

import { validateAddress } from './validate';

export function isAddress (address?: HexString | string | null, ignoreChecksum?: boolean, ss58Format?: Prefix): address is string {
  try {
    return validateAddress(address, ignoreChecksum, ss58Format);
  } catch (error) {
    return false;
  }
}
