// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Prefix } from './types';

import { logger } from '@polkadot/util';

import { defaults } from './defaults';

const l = logger('setSS58Format');

/**
 * @description Sets the global SS58 format to use for address encoding
 * @deprecated Use keyring.setSS58Format
 */
export function setSS58Format (prefix: Prefix): void {
  l.warn('Global setting of the ss58Format is deprecated and not recommended. Set format on the keyring (if used) or as pat of the address encode function');

  defaults.prefix = prefix;
}
