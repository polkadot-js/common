// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { BN } from '@polkadot/util';
import type { HexString } from '@polkadot/util/types';
import type { Prefix } from './types';

import { encodeAddress } from './encode';
import { createKeyMulti } from './keyMulti';

/**
 * @name encodeMultiAddress
 * @summary Creates a multisig address.
 * @description
 * Creates a Substrate multisig address based on the input address and the required threshold.
 */
export function encodeMultiAddress (who: (HexString | Uint8Array | string)[], threshold: bigint | BN | number, ss58Format?: Prefix): string {
  return encodeAddress(createKeyMulti(who, threshold), ss58Format);
}
