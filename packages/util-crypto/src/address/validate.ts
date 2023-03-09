// Copyright 2017-2023 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@polkadot/util/types';
import type { Prefix } from './types.js';

import { decodeAddress } from './decode.js';

export function validateAddress (encoded?: HexString | string | null, ignoreChecksum?: boolean, ss58Format?: Prefix): encoded is string {
  return !!decodeAddress(encoded, ignoreChecksum, ss58Format);
}
