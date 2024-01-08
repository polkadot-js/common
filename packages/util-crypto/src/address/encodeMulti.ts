// Copyright 2017-2024 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { BN } from '@polkadot/util';
import type { Prefix } from './types.js';

import { encodeAddress } from './encode.js';
import { createKeyMulti } from './keyMulti.js';

/**
 * @name encodeMultiAddress
 * @summary Creates a multisig address.
 * @description
 * Creates a Substrate multisig address based on the input address and the required threshold.
 */
export function encodeMultiAddress (who: (string | Uint8Array)[], threshold: bigint | BN | number, ss58Format?: Prefix): string {
  return encodeAddress(createKeyMulti(who, threshold), ss58Format);
}
