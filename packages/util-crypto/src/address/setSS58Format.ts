// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Prefix } from './types';

import { defaults } from './defaults';

/**
 * @description Sets the global SS58 format to use for address encoding
 * @deprecated Use keyring.setSS58Format
 */
export function setSS58Format (prefix: Prefix): void {
  defaults.prefix = prefix;
}
