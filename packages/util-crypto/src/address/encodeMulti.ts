// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Prefix } from './types';

import BN from 'bn.js';

import { encodeAddress } from './encode';
import { createKeyMulti } from './keyMulti';

/**
 * @name encodeMultiAddress
 * @summary Creates a multisig address.
 * @description
 * Creates a Substrate multisig address based on the input address and the required threshold.
 */
export function encodeMultiAddress (who: (Uint8Array | string)[], threshold: BigInt | BN | number, ss58Format?: Prefix): string {
  return encodeAddress(createKeyMulti(who, threshold), ss58Format);
}
